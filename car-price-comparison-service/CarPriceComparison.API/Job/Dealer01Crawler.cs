using System.Text.RegularExpressions;
using HtmlAgilityPack;
using Serilog;

namespace CarPriceComparison.API.Services;

public class Dealer01Crawler
{
    private readonly HttpClient _httpClient;

    public Dealer01Crawler()
    {
        _httpClient = new HttpClient();
    }
    
    public async Task<IEnumerable<string>> GetCrawlUrl(string url)
    {
        Log.Information($"GetCrawlUrl: {url}");

        try
        {
            var html = await _httpClient.GetStringAsync(url);

            var htmlDoc = new HtmlDocument();
            htmlDoc.LoadHtml(html);

            var crawlUrlList = new List<string>();
            var pagingCurrents = htmlDoc.DocumentNode.SelectNodes("//div[@class='paging-current']");
            if (pagingCurrents != null)
            {
                foreach (var paging in pagingCurrents)
                {
                    var pageText = paging.InnerText;
                    // 使用正则表达式提取特定部分
                    var match = Regex.Match(pageText, @"Page \d+ of (\d+)");
                    if (match.Success)
                    {
                        var pageNumber = match.Groups[1].Value;
                        for (int i = int.Parse(pageNumber); i >= 1; i--)
                        {
                            crawlUrlList.Add(url+"?"+"page="+i);
                        }
                        Log.Information($"Extracted Page Number: {pageNumber}");
                    }
                    else
                    {
                        Log.Warning("No match found.");
                    }
                    
                }
            }
            else
            {
                Log.Warning("No pagingCurrent found at the given URL.");
            }

            return crawlUrlList;
        }
        catch (System.Exception ex)
        {
            Log.Error(ex, $"An error occurred while crawling the URL: {url}");
            return new List<String>();
        }
    }
    
    public async Task StartCrawl(IEnumerable<string> urls)
    {
        Log.Information($"Starting crawl for urls: {urls}");
        foreach (var url in urls)
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
}