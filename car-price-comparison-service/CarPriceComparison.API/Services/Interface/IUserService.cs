using CarPriceComparison.API.Models;
using CarPriceComparison.API.Models.DTO;

namespace CarPriceComparison.API.Services.Interface;

public interface IUserService
{
    UserList GetAll(int pageNum, int pageSize);
    User GetById(long id);
    User GetByName(string username);
    bool Add(UserCreateDto userCreate);
    bool Update(UserUpdateDto userUpdateDto);
    bool Delete(long id);
    Task<User> ValidateUser(string username, string password);
    bool CheckUsernameExist(string username);
}