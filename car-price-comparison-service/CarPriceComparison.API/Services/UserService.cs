using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection;
using CarPriceComparison.API.Data;
using CarPriceComparison.API.Models;
using CarPriceComparison.API.Models.DTO;
using CarPriceComparison.API.UserServices.Interface;

namespace CarPriceComparison.API.UserServices;

public class UserService : IUserService
{
    
    private readonly ApplicationDbContext _context;

    public UserService(ApplicationDbContext context)
    {
        _context = context;
    }
    
    public UserList GetAll(int pageNumber, int pageSize)
    {
        var totalRecords = _context.Users.Count();
        var users = _context.Users.OrderBy(u => u.UserId)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToList();
        return new UserList(totalRecords, users);
    }

    public User GetById(int userId)
    {
        return _context.Users.Find(userId);
    }

    public bool Add(User user)
    {
        _context.Users.Add(user);
        _context.SaveChanges();
        return true;
    }

    public bool Update(User user)
    {
        var existUser = _context.Users.Find(user.UserId);
        if (null == existUser)
        {
            return false;
        }
        
        existUser.Username = user.Username;
        // we can add more fields here

        _context.SaveChanges();
        return true;
    }

    public bool UpdatePartial(int userId, UpdateUserDto userDto)
    {
        var existingUser = _context.Users.Find(userId);
        if (existingUser == null)
        {
            return false;
        }

        // 动态更新字段
        var properties = typeof(UpdateUserDto).GetProperties();
        foreach (var property in properties)
        {
            var newValue = property.GetValue(userDto);
            if (newValue != null && !newValue.Equals(GetDefault(property.PropertyType)))
            {
                var propertyInfo = existingUser.GetType().GetProperty(property.Name);
                if (propertyInfo != null && propertyInfo.CanWrite)
                {
                    propertyInfo.SetValue(existingUser, newValue);
                    _context.Entry(existingUser).Property(propertyInfo.Name).IsModified = true;
                }
            }
        }

        _context.SaveChanges();
        return true;
    }

    private static object GetDefault(Type type)
    {
        return type.IsValueType ? Activator.CreateInstance(type) : null;
    }
    
    public bool Delete(int userId)
    {
        var user = _context.Users.Find(userId);
        if (null == user)
        {
            return false;
        }

        _context.Users.Remove(user);
        _context.SaveChanges();
        return true;
    }
}