using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WorkTime.Data.Enums
{
    public enum RequestStatus
    {
        New = 1,
        SentForApproval,
        SubmittedForApproval,
        Approved,
        NotAgreed,
        NotApproved,
        Revoked
    }
}
