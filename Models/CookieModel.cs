using System;
using System.Collections.Generic;
using Kardo20.Models;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace Kardo2020.Models
{
    public class CookieModel
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IResponseCookies _response;
        private readonly IRequestCookieCollection _request;

        public string UserName
        {
            get => Get<string>("UserName");
            set => Set("UserName", value);
        }
        public List<LoginCookies> deneme
        {
            get => Get<List<LoginCookies>>("deneme");
            set => Set("deneme", value);
        }

        public CookieModel(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _response = _httpContextAccessor.HttpContext.Response.Cookies;
            _request = _httpContextAccessor.HttpContext.Request.Cookies;
        }
        public void Set<T>(string key, T value, CookieOptions ops)
        {
            string str = JsonConvert.SerializeObject(value);
            _response.Append(key, str, ops);
        }
        public void Set<T>(string key, T value)
        {
            CookieOptions ops = new CookieOptions();
            ops.Expires = DateTime.UtcNow.AddYears(1);
            
            Set<T>(key, value, ops);
        }
        public T Get<T>(string key)
        {
            string value = _request[key];
            return value == null ? default(T) : JsonConvert.DeserializeObject<T>(value);
        }
        public void Delete(string key)
        {
            _response.Delete(key);
        }
    }
}
