using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Mapster;
using RealEstate.DAL.Entities;
using RealEstate.DAL.Persistance;
using RealEstate.BLL.Models.UserModels;

namespace RealEstate.BLL.Managers
{
    public class UserManager : IUserManager
    {
        protected RealEstateDbContext _dataContext;
        protected UserManager<User> _userManager;

        public UserManager(RealEstateDbContext dataContext, UserManager<User> userManager)
        {
            _dataContext = dataContext;
            _userManager = userManager;
        }

        public IQueryable<UserViewModel> GetAll()
        {
            var users = _dataContext.Users
                .AsNoTracking()
                .Select(u => u.Adapt<UserViewModel>());
            return users;
        }

        public async Task<UserDetailedViewModel> GetByIdAsync(Guid id)
        {
            var userById = await _dataContext.Users
                .AsNoTracking()
                .Where(u => u.Id == id)
                .FirstOrDefaultAsync()
                ?? throw new Exception("The user with such id doesn't exist");
            
            return userById.Adapt<UserDetailedViewModel>();
        }

        public async Task<UserDetailedViewModel> GetByEmailAsync(string email)
        {
            var userByEmail = await _dataContext.Users
                .AsNoTracking()
                .Where(u => u.Email == email)
                .FirstOrDefaultAsync()
                ?? throw new Exception("The user with such email doesn't exist");
            
            return userByEmail.Adapt<UserDetailedViewModel>();
        }

        public async Task<UserDetailedViewModel> GetByUsernameAsync(string username)
        {
            var userByUsername = await _dataContext.Users
                .AsNoTracking()
                .Where(u => u.UserName == username)
                .FirstOrDefaultAsync()
                ?? throw new Exception("The user with such username doesn't exist");
            
            return userByUsername.Adapt<UserDetailedViewModel>();
        }

        public async Task<UserDetailedViewModel> CreateAsync(UserCreateModel model)
        {
            // Validate required fields
            if (string.IsNullOrWhiteSpace(model.UserName))
            {
                throw new Exception("Username is required");
            }
            
            if (string.IsNullOrWhiteSpace(model.Email))
            {
                throw new Exception("Email is required");
            }
            
            if (string.IsNullOrWhiteSpace(model.Password))
            {
                throw new Exception("Password is required");
            }
            
            var user = model.Adapt<User>();
            
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                throw new Exception($"Failed to create user: {string.Join(", ", result.Errors.Select(e => e.Description))}");
            }
            
            return user.Adapt<UserDetailedViewModel>();
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var userById = await _dataContext.Users
                .Where(u => u.Id == id)
                .FirstOrDefaultAsync()
                ?? throw new Exception("The user with such id doesn't exist");

            var result = await _userManager.DeleteAsync(userById);
            if (!result.Succeeded)
            {
                throw new Exception($"Failed to delete user: {string.Join(", ", result.Errors.Select(e => e.Description))}");
            }
            
            return true;
        }

        public async Task<bool> IsExists(Guid id)
        {
            return await _dataContext.Users.AnyAsync(u => u.Id == id);
        }

        public async Task<bool> IsExists(string email)
        {
            return await _dataContext.Users.AnyAsync(u => u.Email == email);
        }

        public async Task<bool> IsExistsByUsername(string username)
        {
            return await _dataContext.Users.AnyAsync(u => u.UserName == username);
        }

        public async Task<UserDetailedViewModel> UpdateAsync(UserUpdateModel model)
        {
            var existingUser = await _dataContext.Users
                .FirstOrDefaultAsync(u => u.Id == model.Id)
                ?? throw new Exception("The user with such id doesn't exist");

            // Update basic properties
            model.Adapt(existingUser);

            var result = await _userManager.UpdateAsync(existingUser);
            if (!result.Succeeded)
            {
                throw new Exception($"Failed to update user: {string.Join(", ", result.Errors.Select(e => e.Description))}");
            }
            
            return existingUser.Adapt<UserDetailedViewModel>();
        }
    }
} 