using CarPriceComparison.API.Data;
using CarPriceComparison.API.Models;
using CarPriceComparison.API.Models.DTO;
using CarPriceComparison.API.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace CarPriceComparison.API.Services;

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

    public User GetById(long userId)
    {
        return _context.Users.Find(userId);
    }

    public async Task Add(User user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
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

    public bool UpdatePartial(long userId, UpdateUserDto userDto)
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
    
    public bool Delete(long userId)
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

    public async Task<User> ValidateUser(string username, string password)
    {
        if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
        {
            return null;
        }

        var user = await _context.Users.SingleOrDefaultAsync(u => u.Username == username);
        if (null == user || !BCrypt.Net.BCrypt.Verify(password, user.Password))
        {
            return null;
        }

        return user;
    }
    
    public bool CheckUsernameExist(string username)
    {
        if (string.IsNullOrEmpty(username))
        {
            return false;
        }

        var user = _context.Users.SingleOrDefault(u => u.Username == username);
        if (null == user)
        {
            return true;
        }

        return false;
    }
    
}