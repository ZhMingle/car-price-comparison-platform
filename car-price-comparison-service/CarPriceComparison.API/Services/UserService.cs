using AutoMapper;
using CarPriceComparison.API.Data;
using CarPriceComparison.API.Models;
using CarPriceComparison.API.Models.Base;
using CarPriceComparison.API.Models.DTO;
using CarPriceComparison.API.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace CarPriceComparison.API.Services;

public class UserService : IUserService
{
    
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public UserService(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public UserList GetAll(String? username, String? mobile, int pageNumber, int pageSize)
    {
        var query = _context.Users.AsQueryable();
        
        if (!string.IsNullOrEmpty(username))
        {
            query = query.Where(u => u.Username.Contains(username));
        }
        
        if (!string.IsNullOrEmpty(mobile))
        {
            query = query.Where(u => u.Mobile.Contains(mobile));
        }
        
        
        var totalRecords = query.Count();
        var users = query
            .OrderByDescending(u => u.UserId)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToList();
        
        return new UserList(totalRecords, users);
    }

    public User GetById(long userId)
    {
        return _context.Users.Where(u => u.UserId == userId)
            .FirstOrDefault();
    }

    public User GetByName(string username)
    {
        var existUser = _context.Users.Where(u => u.Username.Equals(username))
            .FirstOrDefault();
        if (null == existUser)
        {
            return null;
        }

        return existUser;
    }

    public bool Add(UserCreateDto userCreateDto)
    {
        // UserDTO mapper to User
        userCreateDto.Password = BCrypt.Net.BCrypt.HashPassword(userCreateDto.Password);
        var user = _mapper.Map<User>(userCreateDto);
        user.CreateUserId = Constants.AdminUser.CreateUserId;
        user.CreateTime = DateTime.Now;
        user.UpdateTime = DateTime.Now;
        
        _context.Users.Add(user);
        _context.SaveChanges();
        return true;
    }

    public bool Update(UserUpdateDto userUpdateDto)
    {
        var existUser = _context.Users.Find(userUpdateDto.UserId);
        if (null == existUser)
        {
            return false;
        }
        
        _mapper.Map(userUpdateDto, existUser);
        existUser.UpdateTime = DateTime.Now;
        _context.Users.Update(existUser);
        _context.SaveChanges();
        return true;
    }

    public bool Delete(long userId)
    {
        var user = _context.Users.Find(userId);
        if (null == user)
        {
            return false;
        }

        user.Status = Constants.UserStatus.Disable;
        _context.Users.Update(user);
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