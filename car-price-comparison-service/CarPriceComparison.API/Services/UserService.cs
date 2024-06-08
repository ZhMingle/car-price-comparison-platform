using CarPriceComparison.API.Data;
using CarPriceComparison.API.Models;
using CarPriceComparison.API.UserServices.Interface;

namespace CarPriceComparison.API.UserServices;

public class UserService : IUserService
{
    
    private readonly ApplicationDbContext _context;

    public UserService(ApplicationDbContext context)
    {
        _context = context;
    }
    
    private List<User> _users = new List<User>
    {
        new User(1,"kris"),
        new User(2,"Travis")
    };

    public IEnumerable<User> GetAll(int pageIndex, int pageNum)
    {
        return _users;
    }

    public User GetById(int userId)
    {
        return _context.Users.Find(userId);
    }

    public bool Add(User user)
    {
        return true;
    }

    public bool Update(User user)
    {
        return true;
    }

    public bool Delete(int userId)
    {
        return true;
    }
}