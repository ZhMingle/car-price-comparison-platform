using CarPriceComparison.API.Models;

namespace CarPriceComparison.API.Services.Interface;

public interface IDealerService
{
    DealerList GetAll(int pageNum, int pageSize);
    Dealer GetById(long id);
    bool Add(DealerCreateDto dealerCreate);
    bool Update(DealerUpdateDto dealerUpdate);
    bool Delete(long id);
}