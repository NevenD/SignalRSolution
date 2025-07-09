using Microsoft.AspNetCore.SignalR;

namespace SignalRTestAPI.Hubs
{
    public sealed class MapHub : Hub
    {
        public async Task SendLocation(double lat, double lon)
        {
            await Clients.All.SendAsync(HubIdentifier.RecieveLocation, lat, lon);
        }
    }
}
