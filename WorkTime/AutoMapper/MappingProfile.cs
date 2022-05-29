using AutoMapper;
using WorkTime.Data.Models;
using WorkTime.ServiceModels;
using WorkTime.ViewModel;
using WorkTime.ViewModel.Department;
using WorkTime.ViewModel.Request;
using WorkTime.ViewModel.User;

namespace WorkTime.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            Configure_User();
        }

        private void Configure_User()
        {
            CreateMap<User, LoginModel>();

            CreateMap<LoginModel, User>();

            CreateMap<UserEditViewModel, User>()
                .ForMember(dest => dest.Password, opt => opt.Ignore());
            
            CreateMap<User, UserEditViewModel>();

            CreateMap<DepartmentEditViewModel, DepartmentModel>()
                .ForMember(dest => dest.Head, opt => opt.Ignore());

            CreateMap<RequestEditViewModel, Request>();
        }
    }
}