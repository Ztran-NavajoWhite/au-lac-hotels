# Network Setup Guide for Multi-Computer Development

This guide explains how to access your Docker services from other computers on your network.

## 🔧 Changes Made to docker-compose.yml

The main change is binding ports to all network interfaces (`0.0.0.0`) instead of just localhost:

```yaml
# Before (localhost only)
ports:
  - "8000:8000"

# After (network accessible)
ports:
  - "0.0.0.0:8000:8000"
```

## 🌐 Accessing Services from Other Computers

### 1. Find Your Computer's IP Address

On the computer running Docker, find your local IP address:

**Windows:**
```cmd
ipconfig
```
Look for "IPv4 Address" under your active network adapter.

**macOS/Linux:**
```bash
ifconfig
# or
ip addr show
```

### 2. Service URLs for Other Computers

Replace `YOUR_COMPUTER_IP` with your actual IP address:

| Service | URL | Port |
|---------|-----|------|
| **Laravel API** | `http://YOUR_COMPUTER_IP:8000` | 8000 |
| **WordPress** | `http://YOUR_COMPUTER_IP:8081` | 8081 |
| **PHPMyAdmin** | `http://YOUR_COMPUTER_IP:8080` | 8080 |
| **MySQL** | `YOUR_COMPUTER_IP:3307` | 3307 |
| **Redis** | `YOUR_COMPUTER_IP:6379` | 6379 |

### 3. Example Configuration

If your computer's IP is `192.168.1.100`:

- **Laravel**: `http://192.168.1.100:8000`
- **WordPress**: `http://192.168.1.100:8081`
- **PHPMyAdmin**: `http://192.168.1.100:8080`

## 🔒 Security Considerations

### Firewall Configuration

**Windows:**
1. Open Windows Defender Firewall
2. Allow incoming connections on ports: 8000, 8081, 8080, 3307, 6379

**macOS:**
1. System Preferences → Security & Privacy → Firewall
2. Add applications or allow incoming connections

**Linux:**
```bash
# Ubuntu/Debian
sudo ufw allow 8000
sudo ufw allow 8081
sudo ufw allow 8080
sudo ufw allow 3307
sudo ufw allow 6379

# CentOS/RHEL
sudo firewall-cmd --permanent --add-port=8000/tcp
sudo firewall-cmd --permanent --add-port=8081/tcp
sudo firewall-cmd --permanent --add-port=8080/tcp
sudo firewall-cmd --permanent --add-port=3307/tcp
sudo firewall-cmd --permanent --add-port=6379/tcp
sudo firewall-cmd --reload
```

### Network Security

⚠️ **Warning**: These services are now accessible to anyone on your local network. Consider:

1. **VPN**: Use a VPN for secure remote access
2. **Authentication**: Ensure strong passwords for database and admin access
3. **Network Isolation**: Use a separate development network if possible

## 🚀 Development Workflow

### On Computer Running Docker:

1. **Start Services:**
```bash
cd Wordpress-Laravel
docker-compose up -d
```

2. **Check Status:**
```bash
docker-compose ps
```

3. **View Logs:**
```bash
docker-compose logs -f laravel
docker-compose logs -f wordpress
```

### On Other Computers:

1. **Access Laravel API:**
```bash
curl http://YOUR_COMPUTER_IP:8000/api
```

2. **Access WordPress:**
```
http://YOUR_COMPUTER_IP:8081
```

3. **Database Access:**
```
Host: YOUR_COMPUTER_IP
Port: 3307
Database: au_lac_db
Username: au_lac_user
Password: au_lac_password
```

## 🔧 Troubleshooting

### Common Issues:

1. **Connection Refused:**
   - Check if Docker is running
   - Verify firewall settings
   - Confirm IP address is correct

2. **Port Already in Use:**
   - Change ports in docker-compose.yml
   - Stop conflicting services

3. **Database Connection Issues:**
   - Ensure MySQL container is running
   - Check network connectivity
   - Verify credentials

### Debug Commands:

```bash
# Check if ports are listening
netstat -an | findstr :8000  # Windows
netstat -an | grep :8000     # Linux/macOS

# Test connectivity
telnet YOUR_COMPUTER_IP 8000

# Check Docker network
docker network ls
docker network inspect wordpress-laravel_au_lac_network
```

## 📱 Mobile Development

You can also access these services from mobile devices on the same network:

- **Test Laravel API** from mobile apps
- **Preview WordPress** on mobile browsers
- **Debug responsive design** on actual devices

## 🎯 Next Steps

1. **Test Network Access**: Try accessing services from another computer
2. **Configure IDE**: Set up remote development in your IDE
3. **Set Up Git**: Clone the repository on your development computer
4. **Start Coding**: Begin development on the remote computer

---

**Happy Coding! 🚀**
