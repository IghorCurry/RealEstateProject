using RealEstate.BLL.Models.InquiryModels;

namespace RealEstate.BLL.Managers
{
    public interface IInquiryManager
    {
        public IQueryable<InquiryViewModel> GetAll();
        public Task<InquiryViewModel> GetByIdAsync(Guid id);
        public Task<IQueryable<InquiryViewModel>> GetByPropertyIdAsync(Guid propertyId);
        public Task<IQueryable<InquiryViewModel>> GetByUserIdAsync(Guid userId);
        public Task<InquiryViewModel> CreateAsync(InquiryCreateModel model);
        public Task<bool> IsExists(Guid id);
        public Task<InquiryViewModel> UpdateAsync(InquiryUpdateModel model);
        public Task<bool> DeleteAsync(Guid id);
    }
} 