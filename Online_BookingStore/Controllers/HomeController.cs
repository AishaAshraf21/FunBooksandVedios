using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Online_BookingStore.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult SpeProduct()
        {
            return View();
        }
        public JsonResult CheckUser(string user, string pass)
        {
            try
            {
                List<users> u = new List<users>();

                users i = new users();
                i.user = "Aisha"; i.pass = "123";i.role = "paid";
                u.Add(i);
                users ii = new users();
                ii.user = "Aisha"; ii.pass = "123"; ii.role = "free";
                u.Add(ii);
                users iii = new users();
                iii.user = "Aisha"; iii.pass = "123"; iii.role = "paid";
                u.Add(iii);

                users data = new users();

                data = u.AsEnumerable().Where(a => a.user == user && a.pass == pass).FirstOrDefault();  //u.Where(a => a.user == user && a.pass == pass).FirstOrDefault();


                if (data != null)
                {
                    Session["User"] = data.user;
                    Session["Role"] = data.role;

                }

                return Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception es)
            { }
            return Json("ERROR", JsonRequestBehavior.AllowGet);
        }

        public JsonResult Product(string Name,string Author,string url,string pro)
        {
            try
            {
                if(pro=="free")
                {
                    Session["role"] = "free";
                }
                Session["name"]=Name;
                Session["url"]=url;
                Session["auth"] =Author;
                Session["pro"] = pro;


                return Json("done", JsonRequestBehavior.AllowGet);
            }
            catch (Exception es)
            { }
            return Json("ERROR", JsonRequestBehavior.AllowGet);
        }
        public ActionResult Login()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Premium()
        {
            return View();
        }
    }
    public class users
        {
        public string user { get; set; }
        public string pass { get; set; }
        public string role { get; set; }

    }
}