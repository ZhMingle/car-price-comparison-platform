using CarPriceComparison.API.Services;
using Quartz;
using Serilog;

namespace CarPriceComparison.API.Job;

public class Dealer01CrawlerJob : IJob
{
    public async Task Execute(IJobExecutionContext context)
    {
        /*Log.Information("Dealer01CrawlerJob triggered at {Time}", DateTimeOffset.Now);
        var crawler = new Dealer01Crawler();
        var IEnumerable = await crawler.GetCrawlUrl("https://www.2cheapcars.co.nz/used-vehicles");*/
        //await crawler.StartCrawl(IEnumerable); 
    }
}