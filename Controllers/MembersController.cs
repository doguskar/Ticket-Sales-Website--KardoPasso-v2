using System;
using System.Collections.Generic;
using System.Linq;
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
    public class MembersController : Controller
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ISession _session;
        private readonly SessionModel Sessions;
        private readonly CookieModel Cookies;

        public MembersController(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _session = _httpContextAccessor.HttpContext.Session;
            Sessions = new SessionModel(_session);
            Cookies = new CookieModel(_httpContextAccessor);
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
                if (loginRequest.DoNotControlPassword || IsCorrectPassword(loginRequest.Password, theUser.ValidPassword))
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

        private Users GetUserFromLoginKey(string LoginKey)
        {
            Users theUser;
            using (var ctx = new kardoContext())
            {
                theUser = ctx.Users.Where(e => e.Username == LoginKey || e.PrimaryEmail == LoginKey).FirstOrDefault();
            }
            return theUser;
        }
        private bool IsCorrectPassword(string recivedPassword, string validPassword)
        {
            return recivedPassword == validPassword;
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
            Sessions.UserUID = theUser.Uuid.ToString();
        }
        private void AddUserToCookies(Users theUser, LoginRequest loginRequest)
        {
            List<LoginCookie> loginCookies = Cookies.LoginCookies;

            LoginCookie loginCookie = new LoginCookie();
            loginCookie.UserUID = theUser.Uuid.ToString();
            loginCookie.Password = loginRequest.KeepMeSignIn;
            if (loginRequest.KeepMeSignIn)
                loginCookie.Active = true;

            if (loginCookies == null)
                loginCookies = new List<LoginCookie>();

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
    }
}