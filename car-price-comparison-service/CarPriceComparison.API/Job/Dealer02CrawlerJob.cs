using CarPriceComparison.API.Services;
using Quartz;
using Serilog;

namespace CarPriceComparison.API.Job;

public class Dealer02CrawlerJob : IJob
{
    public async Task Execute(IJobExecutionContext context)
    {
        Log.Information("Dealer02CrawlerJob triggered at {Time}", DateTimeOffset.Now);
        var crawler = new Dealer02Crawler();
        await crawler.StartCrawl("https://example.com/dealers"); 
    }
}