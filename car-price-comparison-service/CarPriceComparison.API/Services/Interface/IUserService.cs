using CarPriceComparison.API.Models;
using CarPriceComparison.API.Models.DTO;

namespace CarPriceComparison.API.Services.Interface;

public interface IUserService
{
    UserList GetAll(int pageNum, int pageSize);
    User GetById(long id);
    bool Add(User user);
    bool Update(User user);
    bool UpdatePartial(long userId, UpdateUserDto userDto);
    bool Delete(long id);
    Task<User> ValidateUser(string username, string password);
    bool CheckUsernameExist(string username);
}