using Microsoft.AspNetCore.Mvc;
using WorkTime.ViewModel;

namespace WorkTime.Controllers
{
    [Route("statistic")]
    public class StatisticController : Controller
    {
        [HttpGet("getStatistic")]
        public IActionResult GetStatistic()
        {
            return new JsonResult(new StatisticViewModel());
        }
    }
}