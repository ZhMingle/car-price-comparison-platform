using AutoMapper;
using CarPriceComparison.API.Data;
using CarPriceComparison.API.Models;
using CarPriceComparison.API.Models.Base;
using CarPriceComparison.API.Services.Interface;

namespace CarPriceComparison.API.Services;

public class DealerService : IDealerService
{
    
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly VehicleService _vehicleService;

    public DealerService(ApplicationDbContext context, IMapper mapper, VehicleService vehicleService)
    {
        _context = context;
        _mapper = mapper;
        _vehicleService = vehicleService;
    }
    
    public DealerList GetAll(int pageNumber, int pageSize)
    {
        var totalRecords = _context.Dealers.Count();
        var dealers = _context.Dealers.Where(u => u.Status == Constants.DealerStatus.Normal)
            .OrderBy(d => d.DealerId)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToList();
        return new DealerList(totalRecords, dealers);
    }

    public Dealer GetById(long dealerId)
    {
        return _context.Dealers.Where(d => d.DealerId == dealerId && d.Status == Constants.DealerStatus.Normal)
            .FirstOrDefault();
    }

    public bool Add(DealerCreateDto dealerCreateDto)
    {
        // DealerDTO mapper to Dealer
        var dealer = _mapper.Map<Dealer>(dealerCreateDto);
        dealer.Status = Constants.DealerStatus.Normal;
        dealer.CreateTime = DateTime.Now;
        dealer.UpdateTime = DateTime.Now;
        
        _context.Dealers.Add(dealer);
        _context.SaveChanges();
        return true;
    }

    public bool Update(DealerUpdateDto dealerUpdateDto)
    {
        var existDealer = _context.Dealers.Find(dealerUpdateDto.DealerId);
        if (null == existDealer)
        {
            return false;
        }
        
        _mapper.Map(dealerUpdateDto, existDealer);
        existDealer.UpdateTime = DateTime.Now;
        _context.Dealers.Update(existDealer);
        _context.SaveChanges();
        return true;
    }

    public bool Delete(long dealerId)
    {
        var dealer = _context.Dealers.Find(dealerId);
        if (null == dealer)
        {
            return false;
        }

        dealer.Status = Constants.DealerStatus.Disable;
        _context.Dealers.Update(dealer);
        _context.SaveChanges();

        _vehicleService.UpdateStatusByVDealerId(dealerId);
        
        return true;
    }

}