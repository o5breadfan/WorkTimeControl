using System.Collections.Generic;
using WorkTime.Data.Enums;

namespace WorkTime.ViewModel
{
    public class StatisticViewModel
    {
        public long DaysWorkedCurrentYear { get; set; } = 0;

        public long NotUsedCurrentYear { get; set; } = 0;

        public long NotUsedLastYear { get; set; } = 0;

        public long DayOffCurrentYear { get; set; } = 0;
        
        public List<RequestStatistic> RequestStatistics { get; set; }
    }

    public abstract class RequestStatistic
    {
        public RequestType RequestType { get; set; }
        
        public long NumberOfDays { get; set; }
    }
}