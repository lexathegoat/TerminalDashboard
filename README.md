# Corex Terminal Dashboard

An advanced terminal-based dashboard for real-time system monitoring with a beautiful text user interface (TUI). Built with Node.js and inspired by the need for comprehensive system insights in a single view.

## Features

- **Real-time System Monitoring**: CPU, RAM, Disk and Network usage tracking
- **Comprehensive Resource View**: Detailed breakdown of system resources
- **Network Interface Monitoring**: Track bandwidth and connection status
- **Disk Usage Visualization**: Visual representation of storage consumption
- **Git Repository Status**: View git status for current directory
- **Process Monitoring**: Top CPU consuming processes
- **System Logs**: Real-time logging of system events
- **Beautiful TUI Interface**: Clean and intuitive terminal user interface
- **Lightning Fast Updates**: Refreshes every 2 seconds
- **Color-coded Indicators**: Visual feedback for resource utilization

## Screenshots
<img width="1880" height="682" alt="Ekran Görüntüsü_20251027_191335" src="https://github.com/user-attachments/assets/f8b8c8d6-64d4-4585-bd6b-871fac7c105f" />


*Dashboard showing CPU, Memory, Disk, Network, Git status and Processes*

## Prerequisites

- Node.js v12 or higher
- npm (Node Package Manager)
- Git (for Git status features)
- Unix-like system (Linux/macOS) recommended for full features

## Installation

### Quick Installation

```bash
# Clone the repository
git clone https://github.com/lexathegoat/TerminalDashboard.git
cd TerminalDashboard

# Install dependencies
npm install

# Run the dashboard
npm start
```

### Manual Installation
```bash
# Create project directory
mkdir TerminalDashboard
cd TerminalDashboard

# Initialize npm project
npm init -y

# Install required dependencies
npm install blessed systeminformation simple-git moment

# Create dashboard.js file with provided content

# Run the application
node dashboard.js
```

### Docker Installation (Optional)
```bash
# Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "dashboard.js"]
```
Build and run:
```bash
docker build -t TerminalDashboard .
docker run -it TerminalDashboard
```

## Usage

### Running the Dashboard
```bash
# Start the dashboard
npm start

# Or run directly
node dashboard.js

# Run in development mode (if nodemon installed)
npm run dev
```

## Controls

- q or Ctrl+C or Escape: Quit the application
- Resize terminal: Dashboard automatically adjusts to terminal size

## Running in Git Repositories
#### When running in the dashboard in a directory with a Git repository, it will display:
- Current branch
- Number of changed files
- Staged and unstaged changes
- Modified files count

## Technical Architecture
Core Components

    System Information Module (systeminformation)
        Collects detailed hardware and OS information
        Real-time CPU, memory, disk and network stats

    Text User Interface (blessed)
        Renders beautiful terminal-based UI
        Widget management and screen rendering

    Git Integration (simple-git)
        Repository status checking
        Branch information

    Date/Time Management (moment)
        Timestamps for logs
        Time formatting

Data Collection

The dashboard collects information through these system metrics:

    CPU Information:
        Model and manufacturer
        Physical and logical cores
        Current clock speed
        Real-time utilization percentage

    Memory Information:
        Total, used and free memory
        Memory utilization percentage
        Active and available memory

    Disk Information:
        Mounted filesystems
        Total, used and available space
        Usage percentage for each partition

    Network Information:
        Active network interfaces
        IP addresses
        Data transfer statistics (RX/TX)
        Interface speeds

UI Components

    System Info Panel: OS details, hostname, architecture
    CPU Usage Panel: Real-time CPU utilization with progress bar
    Memory Usage Panel: RAM utilization with visual indicator
    Disk Usage Panel: Storage usage across mounted volumes
    Network Panel: Interface statistics and bandwidth
    Git Status Panel: Repository status when in git directory
    Processes Panel: Top 5 CPU-consuming processes
    Logs Panel: System event logging with timestamps
    Footer: Last update timestamp and exit instructions

## Customization
### Modifying Refresh Interval
To change the update frequency, modify this line in dashboard.js:
```javascript
// Change 2000 to desired milliseconds (e.g., 5000 for 5 seconds)
setInterval(() => this.updateData(), 2000);
```
### Adjusting Panel Layout
Panel positions and sizes can be customized by modifying the widget properties
```javascript
this.systemInfoBox = blessed.box({
  top: 3,        // Vertical position
  left: 0,       // Horizontal position
  width: '33%',  // Width (percentage or fixed)
  height: 10,    // Height in rows
  // ... other properties
});
```
### Changing Color Scheme
Modify the 'style' property of any widget:
```javascript
style: {
  fg: 'white',      // Foreground color
  bg: 'blue',       // Background color
  border: {
    fg: '#f0f0f0'   // Border color
  }
}
```
Available colors:

    black, red, green, yellow, blue, magenta, cyan, white
    Hex colors (e.g., '#ff0000')

## API Reference
### Main Classes
- TerminalDashboard
Main dashboard controller class

Methods:

    constructor(): Initialize dashboard and UI
    createWidgets(): Create all dashboard panels
    updateData(): Refresh all system information
    updateSystemInfo(): Update system information panel
    updateCPUInfo(): Update CPU information panel
    updateMemoryInfo(): Update memory information panel
    updateDiskInfo(): Update disk information panel
    updateNetworkInfo(): Update network information panel
    updateGitInfo(): Update Git status panel
    updateProcessInfo(): Update processes panel
    log(message): Add message to log panel

Dependencies

    blessed (^0.1.81)
        Terminal interface library for Node.js
        Creates TUI components and manages rendering

    systeminformation (^5.21.0)
        Comprehensive system information provider
        Cross-platform hardware and OS data collection

    simple-git (^3.19.0)
        Simple Git operations in Node.js
        Status checking and branch information

    moment (^2.29.4)
        Date and time manipulation
        Timestamp formatting for logs

## Troubleshooting
### Common Issues
1."Error: Cannot find module"
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```
2.Git Status Not Showing
- Ensure you're running the dashboard in a Git repository
- Check that Git is properly installed on your system
3.Permission Errors on Linux
```bash
# Solution: Run with appropriate permissions
sudo node dashboard.js
```
4.Performance Issues
- Reduce refresh interval in source code
- Limit number of processes shown

## Platform-Specific Notes

## Linux
- Full feature support
- Requires proper permissions for system metrics

## macOS
- Most features supported
- Some network metrics may differ

## Windows
- Limited feature support
- Some systeminformation methods may not work

## Development
## Project Structure
```
hyperion-terminal-dashboard/
├── dashboard.js          # Main application file
├── package.json          # Project metadata and dependencies
├── README.md             # This file
└── utils/
    └── helpers.js        # Utility functions (optional)
```
## Adding New Features
1. Fork the repo
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## Security
- Runs entirely locally
- No external data transmission
- No internet required for core functionally
- Respects user privacy

## License
THIS PROJECT IS LICENSED UNDER THE MIT LICENSE

## Acknowledgments
- King Terry Davis for inspiration through TempleOS
- The Node.js community for excellent libraries
- Systeminformation.js maintainers for comprehensive system data
- Blessed.js developers for TUI framework

## Author
Lexa & LexaTheGoat & OnurLexa

- GitHub: @lexathegoat && @lexa1337

## Changelog
### v1.0.0
- Initial release
- Complete system monitoring dashboard
- Real-time resource visualization
- Git repository status integration
- Cross-platform support

## Support
For support, please open an issue on GitHub or contact the maintainer
