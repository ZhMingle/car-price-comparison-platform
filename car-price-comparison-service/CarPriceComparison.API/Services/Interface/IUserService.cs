using CarPriceComparison.API.Models;
using CarPriceComparison.API.Models.DTO;

namespace CarPriceComparison.API.UserServices.Interface;

public interface IUserService
{
    UserList GetAll(int pageNum, int pageSize);
    User GetById(int id);
    bool Add(User user);
    bool Update(User user);
    bool UpdatePartial(int userId, UpdateUserDto userDto);
    bool Delete(int id);
}