using Microsoft.AspNetCore.SignalR;
using SignalRTestAPI.Hubs;

namespace SignalRTestAPI.BackgroundServices
{
    public sealed class LocationSimulationService : BackgroundService
    {
        private readonly IHubContext<MapHub> _hubContext;
        private readonly Random _random = new();

        public LocationSimulationService(IHubContext<MapHub> hubContext, Random random)
        {
            _hubContext = hubContext;
            _random = random;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                double lat = 37 + _random.NextDouble();
                double lon = -122 + _random.NextDouble();

                await _hubContext.Clients.All.SendAsync(HubIdentifier.RecieveLocation, lat, lon, stoppingToken);
                await Task.Delay(300, stoppingToken);
            }
        }
    }
}
