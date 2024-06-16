using HtmlAgilityPack;
using Serilog;

namespace CarPriceComparison.API.Services;

public class Dealer02Crawler
{
    private readonly HttpClient _httpClient;

    public Dealer02Crawler()
    {
        _httpClient = new HttpClient();
    }
    
    public async Task StartCrawl(string url)
    {
        Log.Information($"Starting crawl for URL: {url}");

        try
        {
            var html = await _httpClient.GetStringAsync(url);

            var htmlDoc = new HtmlDocument();
            htmlDoc.LoadHtml(html);

            var dealers = htmlDoc.DocumentNode.SelectNodes("//div[@class='dealer']");
            if (dealers != null)
            {
                foreach (var dealer in dealers)
                {
                    var name = dealer.SelectSingleNode(".//h2")?.InnerText;
                    var address = dealer.SelectSingleNode(".//p[@class='address']")?.InnerText;
                    var phone = dealer.SelectSingleNode(".//p[@class='phone']")?.InnerText;
                    var email = dealer.SelectSingleNode(".//a[@class='email']")?.GetAttributeValue("href", "").Replace("mailto:", "");
                    var website = dealer.SelectSingleNode(".//a[@class='website']")?.GetAttributeValue("href", "");

                    Log.Information($"Found dealer: {name}, {address}, {phone}, {email}, {website}");

                    // 处理或保存抓取到的数据
                }
            }
            else
            {
                Log.Warning("No dealers found at the given URL.");
            }
        }
        catch (System.Exception ex)
        {
            Log.Error(ex, $"An error occurred while crawling the URL: {url}");
        }
    
    }
}