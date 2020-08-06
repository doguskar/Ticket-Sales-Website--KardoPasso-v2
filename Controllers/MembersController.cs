using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Kardo20.Models;
using Kardo20.Models.DB;
using Kardo2020.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Kardo20.Controllers
{
    public class MembersController : BaseController
    {

        public MembersController(IHttpContextAccessor httpContextAccessor): base(httpContextAccessor)
        {
            /*
            if (!Sessions._Session)
            {
                Sessions._Session = true;
                CheckCookies();
            }
            */
        }

        public IActionResult Index()
        {
            return View(nameof(Login));
        }
        public IActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public string Login(LoginRequest loginRequest)
        {
            LoginReply reply = new LoginReply();

            //Count login attempts to show captcha
            Sessions.LoginAttempts++;
            //Show captcha login tries more than 2 
            if (Sessions.LoginAttempts > 2)
                reply.showCaptcha = true;

            Users theUser = GetUserFromLoginKey(loginRequest.LoginKey);
            if(theUser != null)
            { 
                //If the user attepmts to login more than 5 then the user is banned for a short time.
                int loginAttemptsOfUser = GetLastLoginAttempts(theUser.UserId);
                if (loginAttemptsOfUser > 5)
                {
                    reply.tooManyAttempts = true;
                    goto lblReturn;
                }

                //DoNotControlPassword to change the user to other user that already login
                if (loginRequest.DoNotControlPassword || IsCorrectPassword(loginRequest.Password, theUser.Password))
                {
                    reply.result = true;
                    AddUserToSessions(theUser);
                    if (loginRequest.RememberMe == true)
                        AddUserToCookies(theUser, loginRequest);
                }
                else
                {
                    reply.invalidPassword = true;
                }
            }
            else
            {
                reply.invalidLoginKey = true;
            }

            if (!reply.invalidLoginKey)
            {
                //save login attempt
                ConnectionInfo connection = _httpContextAccessor.HttpContext.Connection;
                AddAuthenticationInfo(reply, theUser, connection);
            }

        lblReturn:
            return JsonConvert.SerializeObject(reply);
        }

        [HttpPost]
        public bool Logout()
        {
            if (string.IsNullOrEmpty(Sessions.UserInfo.UserUID))
                return false;

            //If the user select keep me sign in when it sign in, remove it
            List<LoginCookie> loginCookies = Cookies.LoginCookies;
            if (loginCookies != null)
            {
                LoginCookie lc = loginCookies.Find(x => x.UserUID == Sessions.UserInfo.UserUID);
                if (lc.Active)
                {
                    lc.Active = false;
                    Cookies.LoginCookies = loginCookies;
                }
            }
            Sessions.Remove("UserInfo");
            return true;
        }

        private Users GetUserFromLoginKey(string LoginKey)
        {
            Users theUser;
            using (var ctx = new kardoContext())
            {
                theUser = ctx.Users.Where(e => e.Username == LoginKey || e.Email == LoginKey).FirstOrDefault();
            }
            return theUser;
        }
        public Users GetUserFromUUID(string UUID)
        {
            Users theUser;
            using (var ctx = new kardoContext())
            {
                theUser = ctx.Users.Where(e => e.Uuid.ToString() == UUID).FirstOrDefault();
            }
            return theUser;
        }
        private bool IsCorrectPassword(string recivedPassword, string validPassword)
        {
            string hashedMd5 = "", hashedSha256 = "";
            using (var sha256 = SHA256.Create())
            {
                var result = sha256.ComputeHash(Encoding.ASCII.GetBytes(recivedPassword));
                hashedSha256 = Convert.ToBase64String(result);
            }
            using (var md5 = MD5.Create())
            {
                var result = md5.ComputeHash(Encoding.ASCII.GetBytes(hashedSha256));
                //hashedMd5 = Encoding.ASCII.GetString(result);
                //hashedMd5 = BitConverter.ToString(result).Replace("-","");
                hashedMd5 = Convert.ToBase64String(result);
            }
            return hashedMd5 == validPassword;
        }
        private int GetLastLoginAttempts(int userId)
        {
            return 0;
        }
        private void AddAuthenticationInfo(LoginReply reply, Users theUser, ConnectionInfo connection)
        {

        }
        private void AddUserToSessions(Users theUser)
        {
            UserInfo userInfo = new UserInfo();
            userInfo.UserUID = theUser.Uuid.ToString();
            userInfo.Username = theUser.Username;
            userInfo.UserRName = theUser.Name + " " + theUser.Surname;
            userInfo.ProfilPic = theUser.ProfilPic;
            Sessions.UserInfo = userInfo;
        }
        private void AddUserToCookies(Users theUser, LoginRequest loginRequest)
        {
            List<LoginCookie> loginCookies = Cookies.LoginCookies;
            if (loginCookies == null)
                loginCookies = new List<LoginCookie>();

            LoginCookie loginCookie = new LoginCookie();
            loginCookie.UserUID = theUser.Uuid.ToString();

            //If the account is saved befor to cookies, don't create new SessionUID
            var i = loginCookies.Find(i => i.UserUID == theUser.Uuid.ToString());
            //If sign in process happens for the first time, create SessionUID for the client
            //Is the account saved to the cookies? If yes, is the account's session valid?
            if (!loginRequest.DoNotControlPassword && (i == null || !IsSessionValid(i.UserUID, i.SessionUID)))
            {
                loginCookie.SessionUID = CreateSUID(theUser.Uuid).ToString();
            }
            else
            {
                loginCookie.SessionUID = i.SessionUID;
            }
            if (loginRequest.KeepMeSignIn)
                loginCookie.Active = true;


            LoginCookie currUser = null;
            foreach (var item in loginCookies)
            {
                //If account is avaible it will remove and it will add again to refresh user's info
                if (item.UserUID == loginCookie.UserUID)
                {
                    currUser = item;
                    continue;
                }
                //LogOff other saved accounts
                item.Active = false;
            }
            if (currUser != null)
                loginCookies.Remove(currUser);

            loginCookies.Add(loginCookie);
            Cookies.LoginCookies = loginCookies;
        }
        private Guid CreateSUID(Guid uuid)
        {
            using (var ctx = new kardoContext())
            {
                Sessions i = new Sessions { Uuid = uuid };
                ctx.Sessions.Add(i);
                ctx.SaveChanges();
                return i.Suid;
            }
        }

        public IActionResult SignIn([FromQuery]string return_path)
        {
            // If there is an account in cookies, it will check from this controller's constructure and this method will redirect previous path
            if (return_path == null)
                return View("/");

            return Redirect(return_path);
        }
        private void CheckCookies()
        {
            List<LoginCookie> loginCookies = Cookies.LoginCookies;
            if (loginCookies != null)
            {
                foreach (LoginCookie item in loginCookies)
                {
                    if (item.Active)
                    {
                        SignInFromCookies(item);
                    }
                }
            }
        }
        private void SignInFromCookies(LoginCookie loginCookie)
        {
            if (IsSessionValid(loginCookie.UserUID, loginCookie.SessionUID))
            {
                LoginRequest loginRequest = new LoginRequest();
                Users theUser = GetUserFromUUID(loginCookie.UserUID);
                //There is a problem if theUser is null then clear cookies. 
                if (theUser != null)
                {
                    loginRequest.LoginKey = theUser.Username;
                    loginRequest.DoNotControlPassword = true;
                    string loginReply = Login(loginRequest);
                }
                else
                {
                    Cookies.Delete("LoginCookies");
                }
            }
            else
            {
                //The session terminated. Remove it from cookeies.
                RemoveAccountFromCookies(loginCookie);
            }

        }
        private bool IsSessionValid(string uuid, string suid)
        {
            using (var ctx = new kardoContext())
            {
                var session = ctx.Sessions.Where(x => x.Uuid.ToString() == uuid && x.Suid.ToString() == suid && x.Valid == true).FirstOrDefault();
                if (session == null)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
        }
        [HttpPost]
        public string GetSavedAccounts()
        {
            List<LoginCookie> loginCookies  = Cookies.LoginCookies;
            if (loginCookies == null || loginCookies.Count < 1)
                return "[]";

            List<string> userUUIDs = new List<string>();
            if (Sessions.UserInfo != null && !string.IsNullOrEmpty(Sessions.UserInfo.UserUID))
            {
                foreach (var item in loginCookies)
                    if (Sessions.UserInfo.UserUID != item.UserUID)
                        userUUIDs.Add(item.UserUID);
            }
            else
            {
                foreach (var item in loginCookies)
                    userUUIDs.Add(item.UserUID);
            }

            List<UserInfo> savedAccounts = new List<UserInfo>();
            using (var ctx = new kardoContext())
            {
                var accountList = ctx.Users.Where(e => userUUIDs.Contains(e.Uuid.ToString()));
                foreach (var item in accountList)
                {
                    UserInfo user = new UserInfo();
                    user.Username = item.Username;
                    user.UserUID = item.Uuid.ToString();
                    user.UserRName = item.Name + " " + item.Surname;
                    user.ProfilPic = item.ProfilPic;
                    savedAccounts.Add(user);
                }
            }

            return JsonConvert.SerializeObject(savedAccounts);
        }
        [HttpPost]
        public string LoginFromWidget()
        {
            LoginReply reply = new LoginReply();

            string uuid = Request.Form["uuid"];
            LoginCookie theLoginCookie = Cookies.LoginCookies.Find(i => i.UserUID == uuid);
            if (theLoginCookie != null)
            {
                if (IsSessionValid(uuid, theLoginCookie.SessionUID))
                {
                    LoginRequest loginRequest = new LoginRequest();
                    Users theUser = GetUserFromUUID(uuid);
                    if (theUser != null)
                    {
                        loginRequest.LoginKey = theUser.Username;
                        loginRequest.DoNotControlPassword = true;
                        loginRequest.RememberMe = true;
                        LoginCookie loginCookieActive = Cookies.LoginCookies.Find(i => i.Active == true);
                        if (loginCookieActive != null)
                        {
                            loginRequest.KeepMeSignIn = true;
                        }
                        return Login(loginRequest);
                    }
                }
                else
                {
                    //The account has saved but it is terminated.
                    reply.sessionTerminated = true;
                    RemoveAccountFromCookies(theLoginCookie);
                }
            }
            return JsonConvert.SerializeObject(reply);
        }
        private void RemoveAccountFromCookies(LoginCookie loginCookie)
        {
            List<LoginCookie> loginCookies = Cookies.LoginCookies;
            loginCookies.Remove(loginCookies.Find(i => i.UserUID == loginCookie.UserUID));
            Cookies.LoginCookies = loginCookies;
        }

        [HttpPost]
        public string GetSessionsUserInfo()
        {
            if (!Sessions._Session)
            {
                Sessions._Session = true;
                CheckCookies();
            }
            return JsonConvert.SerializeObject(Sessions.UserInfo);
        }
    }
}