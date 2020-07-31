using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Kardo20.Models;
using Kardo20.Models.DB;
using Kardo2020.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Kardo20.Controllers
{
    public class BaseController : Controller
    {
        public readonly IHttpContextAccessor _httpContextAccessor;
        public readonly ISession _session;
        public readonly SessionModel Sessions;
        public readonly CookieModel Cookies;

        public BaseController(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _session = _httpContextAccessor.HttpContext.Session;
            Sessions = new SessionModel(_session);
            Cookies = new CookieModel(_httpContextAccessor);
        }
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            //attempting to enter page first time
            if (!Sessions._Session)
            {
                Response.Redirect("/Members/SignIn?return_path=" + Request.Path);
            }
            if (!string.IsNullOrEmpty(Sessions.UserUID))
            {
                ViewData["Session_UserUID"] = Sessions.UserUID;
            }
        }
    }
}