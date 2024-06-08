using CarPriceComparison.API.Models;
using CarPriceComparison.API.UserServices.Interface;

namespace CarPriceComparison.API.UserServices;

public class UserService : IUserService
{
    private List<User> _users = new List<User>
    {
        new User(1,"kris"),
        new User(2,"Travis")
    };

    public IEnumerable<User> GetAll(int pageIndex, int pageNum)
    {
        return _users;
    }

    public User GetById(int id)
    {
        return new User(111, "11223344");
    }

    public bool Add(User user)
    {
        return true;
    }

    public bool Update(User user)
    {
        return true;
    }

    public bool Delete(int id)
    {
        return true;
    }
}