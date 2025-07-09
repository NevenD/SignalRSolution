using SignalRApi.BackgroundServices;
using SignalRTestAPI.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddCors();
builder.Services.AddSignalR();
builder.Services.AddHostedService<LocationSimulationService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors(c =>
    c.AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod());
app.UseHttpsRedirection();

app.MapHub<MapHub>("/mapHub");
app.Run();


