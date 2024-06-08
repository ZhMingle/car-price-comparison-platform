using CarPriceComparison.API.Models;

namespace CarPriceComparison.API.UserServices.Interface;

public interface IUserService
{
    IEnumerable<User> GetAll(int pageIndex, int pageNum);
    User GetById(int id);
    bool Add(User user);
    bool Update(User user);
    bool Delete(int id);
}