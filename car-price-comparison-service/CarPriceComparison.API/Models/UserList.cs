namespace CarPriceComparison.API.Models;

public class UserList
{
    public UserList(int totalRecords, IEnumerable<User> users)
    {
        Total = totalRecords;
        Users = users;
    }
    
    public int Total { get; set; }

    public IEnumerable<User> Users { get; set; }
    
}