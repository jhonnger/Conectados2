using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Conectados2.Helpers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Microsoft.Extensions.Logging;
using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Conectados2.Seguridad;
using Conectados2.Models;
using Conectados2.Servicio;
using Conectados2.Servicio.impl;
using Conectados2.Repositorio;
using Conectados2.Repositorio.impl;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;

namespace Conectados2
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();

           // var connection = @"Server=tcp:conectados220180403104748dbserver.database.windows.net,1433;Initial Catalog=conectaDB;Persist Security Info=False;User ID=jhongger;Password=Cotos123;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

           var connection = @"data source=NotHP;initial catalog=conectaDB;;user id=sa;password=root;integrated security=True;MultipleActiveResultSets=True";

            services.AddDbContext<AuthContext>(options => options.UseSqlServer(connection));
            services.AddDbContext<conectaDBContext>(options => options.UseSqlServer(connection));

            services.AddTransient<TipoDenunciaServicio, TipoDenunciaServicioImpl>();
            services.AddTransient<TipoDenunciaRepositorio, TipoDenunciaRepositorioImpl>();

            services.AddTransient<MunicipalidadServicio, MunicipalidadServicioImpl>();
            services.AddTransient<MunicipalidadRepositorio, MunicipalidadRepositorioImpl>();

            services.AddTransient<TipoMuniServicio, TipoMuniServicioImpl>();
            services.AddTransient<TipoMuniRepositorio, TipoMuniRepositorioImpl>();

            services.AddTransient<SectorServicio, SectorServicioImpl>();
            services.AddTransient<SectorRepositorio, SectorRepositorioImpl>();

            services.AddTransient<TipoSectorServicio, TipoSectorServicioImpl>();
            services.AddTransient<TipoSectorRepositorio, TipoSectorRepositorioImpl>();

            services.AddMvc().AddJsonOptions(options => {
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            });
            services.AddAutoMapper();

            // configure strongly typed settings objects
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            // configure jwt authentication
            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            // configure DI for application services
            services.AddScoped<IUserService, UserService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapRoute(
                    name: "api",
                    template: "api/{controller=Home}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });

            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            // global cors policy
            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());

            app.UseAuthentication();

            app.UseMvc();
        }
    }
}
