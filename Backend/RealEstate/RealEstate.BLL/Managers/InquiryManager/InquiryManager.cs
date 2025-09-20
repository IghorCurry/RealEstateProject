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

        public async Task<MyInquiriesViewModel> GetMyInquiriesAsync(Guid currentUserId)
        {
            // Sent 
            var sentQuery = _dataContext.Inquiries
                .AsNoTracking()
                .Include(i => i.Property)
                .Include(i => i.User)
                .Where(i => i.UserId == currentUserId)
                .ProjectToType<InquiryViewModel>();

            // Received 
            var receivedQuery = _dataContext.Inquiries
                .AsNoTracking()
                .Include(i => i.Property)
                .Include(i => i.User)
                .Where(i => i.Property != null && i.Property.UserId == currentUserId)
                .ProjectToType<InquiryViewModel>();

            var model = new MyInquiriesViewModel
            {
                Sent = await sentQuery.ToListAsync(),
                Received = await receivedQuery.ToListAsync()
            };

            return model;
        }

        public async Task<InquiryViewModel> CreateAsync(InquiryCreateModel model)
        {
            var inquiry = model.Adapt<Inquiry>();
            
            _dataContext.Inquiries.Add(inquiry);
            await _dataContext.SaveChangesAsync();

            var created = await _dataContext.Inquiries
                .AsNoTracking()
                .Include(i => i.Property)!
                    .ThenInclude(p => p.User)
                .Include(i => i.User)
                .FirstOrDefaultAsync(i => i.Id == inquiry.Id)
                ?? inquiry; 

            return created.Adapt<InquiryViewModel>();
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

        public async Task<bool> DeleteAsync(Guid id, Guid currentUserId, bool isAdmin, string? currentUserEmail)
        {
            var inquiry = await _dataContext.Inquiries
                .Include(i => i.Property)!.ThenInclude(p => p!.User)
                .FirstOrDefaultAsync(i => i.Id == id)
                ?? throw new Exception("The inquiry with such id doesn't exist");

            var isSender = inquiry.UserId == currentUserId;
            var isOwner = inquiry.Property != null && inquiry.Property.UserId == currentUserId;
            var isLegacySenderByEmail = !inquiry.UserId.HasValue && !string.IsNullOrEmpty(inquiry.Email) &&
                                        !string.IsNullOrEmpty(currentUserEmail) &&
                                        inquiry.Email!.Equals(currentUserEmail, StringComparison.OrdinalIgnoreCase);

            if (!(isAdmin || isSender || isOwner || isLegacySenderByEmail))
            {
                return false;
            }

            _dataContext.Entry(inquiry).State = EntityState.Deleted;
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

            model.Adapt(existingInquiry);

            _dataContext.Entry(existingInquiry).State = EntityState.Modified;
            await _dataContext.SaveChangesAsync();
            
            return existingInquiry.Adapt<InquiryViewModel>();
        }
    }
} 