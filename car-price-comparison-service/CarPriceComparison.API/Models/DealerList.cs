namespace CarPriceComparison.API.Models;

public class DealerList
{
    public DealerList(int totalRecords, IEnumerable<Dealer> dealers)
    {
        Total = totalRecords;
        Dealers = dealers;
    }
    
    public int Total { get; set; }

    public IEnumerable<Dealer> Dealers { get; set; }
    
}