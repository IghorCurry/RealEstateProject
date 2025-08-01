using RealEstate.BLL.Models.UserModels;

namespace RealEstate.BLL.Managers
{
    internal interface IUserManager
    {
        public IQueryable<UserViewModel> GetAll();
        public Task<UserDetailedViewModel> GetByIdAsync(Guid id);
        public Task<UserDetailedViewModel> GetByEmailAsync(string email);
        public Task<UserDetailedViewModel> GetByUsernameAsync(string username);
        public Task<UserDetailedViewModel> CreateAsync(UserCreateModel model);
        public Task<bool> IsExists(Guid id);
        public Task<bool> IsExists(string email);
        public Task<bool> IsExistsByUsername(string username);
        public Task<UserDetailedViewModel> UpdateAsync(UserUpdateModel model);
        public Task<bool> DeleteAsync(Guid id);
    }
} 