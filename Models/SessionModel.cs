using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Kardo2020.Models
{
    public class SessionModel
    {
        private readonly ISession _session;
        
        public bool _Session
        {
            get => Get<bool>("_Session");
            set => Set("_Session", value);
        }
        public string UserUID
        {
            get => Get<string>("UserUID");
            set => Set("UserUID", value);
        }
        public int LoginAttempts
        {
            get => Get<int>("LoginAttempts");
            set => Set("LoginAttempts", value);
        }







        public SessionModel(ISession session)
        {
            _session = session;
        }
        public void Set<T>(string key, T value)
        {
            string json = JsonConvert.SerializeObject(value);
            _session.SetString(key, JsonConvert.SerializeObject(value));
        }
        //public void Set<T>(SessionKey key, T value) { Set(key.ToString(), value); }
        public T Get<T>(string key)
        {
            var value = _session.GetString(key);
            return value == null ? default(T) : JsonConvert.DeserializeObject<T>(value);
        }
        //public T Get<T>(SessionKey key) { return Get<T>(key.ToString()); }

        public void Clear()
        {
            _session.Clear();
        }
        public void Remove(string key)
        {
            _session.Remove(key);
        }
    }

}
