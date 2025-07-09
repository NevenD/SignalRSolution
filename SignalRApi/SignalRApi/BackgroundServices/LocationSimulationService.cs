using Microsoft.AspNetCore.SignalR;
using SignalRTestAPI.Hubs;

namespace SignalRApi.BackgroundServices
{
    public sealed class LocationSimulationService : BackgroundService
    {
        private readonly IHubContext<MapHub> _hubContext;

        public LocationSimulationService(IHubContext<MapHub> hubContext)
        {
            _hubContext = hubContext;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            Random _random = new();
            while (!stoppingToken.IsCancellationRequested)
            {
                double lat = 37 + _random.NextDouble();
                double lon = -122 + _random.NextDouble();

                await _hubContext.Clients.All.SendAsync(HubIdentifier.RecieveLocation, lat, lon, stoppingToken);
                await Task.Delay(1000, stoppingToken);
            }
        }
    }
}
