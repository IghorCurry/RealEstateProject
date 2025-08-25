using Microsoft.EntityFrameworkCore;
using Mapster;
using RealEstate.DAL.Entities;
using RealEstate.DAL.Persistance;
using RealEstate.BLL.Models.InquiryModels;

namespace RealEstate.BLL.Managers
{
    public class InquiryManager : IInquiryManager
    {
        protected RealEstateDbContext _dataContext;

        public InquiryManager(RealEstateDbContext dataContext)
        {
            _dataContext = dataContext;
        }

        public IQueryable<InquiryViewModel> GetAll()
        {
            var inquiries = _dataContext.Inquiries
                .AsNoTracking()
                .Include(i => i.Property)
                .ProjectToType<InquiryViewModel>();
            return inquiries;
        }

        public async Task<InquiryViewModel> GetByIdAsync(Guid id)
        {
            var inquiryById = await _dataContext.Inquiries
                .AsNoTracking()
                .Include(i => i.Property)
                .Where(i => i.Id == id)
                .ProjectToType<InquiryViewModel>()
                .FirstOrDefaultAsync()
                ?? throw new Exception("The inquiry with such id doesn't exist");
            
            return inquiryById;
        }

        public async Task<IQueryable<InquiryViewModel>> GetByPropertyIdAsync(Guid propertyId)
        {
            var inquiries = _dataContext.Inquiries
                .AsNoTracking()
                .Include(i => i.Property)
                .Where(i => i.PropertyId == propertyId)
                .ProjectToType<InquiryViewModel>();
            
            return await Task.FromResult(inquiries);
        }

        public async Task<IQueryable<InquiryViewModel>> GetByUserIdAsync(Guid userId)
        {
            var inquiries = _dataContext.Inquiries
                .AsNoTracking()
                .Include(i => i.Property)
                .Where(i => i.UserId == userId) // ВИПРАВЛЕНО: запити користувача, який зробив запит, а не власника нерухомості
                .Select(i => i.Adapt<InquiryViewModel>());
            
            return await Task.FromResult(inquiries);
        }

        public async Task<InquiryViewModel> CreateAsync(InquiryCreateModel model)
        {
            var inquiry = model.Adapt<Inquiry>();
            
            _dataContext.Inquiries.Add(inquiry);
            await _dataContext.SaveChangesAsync();
            
            return inquiry.Adapt<InquiryViewModel>();
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var inquiryById = await _dataContext.Inquiries
                .Where(i => i.Id == id)
                .FirstOrDefaultAsync()
                ?? throw new Exception("The inquiry with such id doesn't exist");

            _dataContext.Entry(inquiryById).State = EntityState.Deleted;
            await _dataContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> IsExists(Guid id)
        {
            return await _dataContext.Inquiries.AnyAsync(i => i.Id == id);
        }

        public async Task<InquiryViewModel> UpdateAsync(InquiryUpdateModel model)
        {
            var existingInquiry = await _dataContext.Inquiries
                .FirstOrDefaultAsync(i => i.Id == model.Id)
                ?? throw new Exception("The inquiry with such id doesn't exist");

            // Update basic properties
            model.Adapt(existingInquiry);

            _dataContext.Entry(existingInquiry).State = EntityState.Modified;
            await _dataContext.SaveChangesAsync();
            
            return existingInquiry.Adapt<InquiryViewModel>();
        }
    }
} 