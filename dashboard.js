// dashboard.js - Terminal Dashboard Application
const blessed = require('blessed');
const si = require('systeminformation');
const simpleGit = require('simple-git');
const moment = require('moment');
const os = require('os');
const fs = require('fs');
const path = require('path');

class TerminalDashboard {
    constructor() {
        // Ekranı oluştur
        this.screen = blessed.screen({
            smartCSR: true,
            title: 'LexaTheGoat Terminal Dashboard'
        });

        this.screen.key(['escape', 'q', 'C-c'], () => {
            return process.exit(0);
        });

        // Widget'ları oluştur
        this.createWidgets();
        this.updateData();

        // Periyodik güncelleme
        setInterval(() => this.updateData(), 2000);
    }

    createWidgets() {
        // Başlık
        this.titleBox = blessed.box({
            top: 0,
            left: 0,
            width: '100%',
            height: 3,
            content: `{center}{bold}Corex Terminal Dashboard{/bold} - Press 'q' to quit{/center}`,
            tags: true,
            style: {
                fg: 'white',
                bg: 'blue'
            }
        });
        this.screen.append(this.titleBox);

        // Sistem Bilgileri Paneli
        this.systemInfoBox = blessed.box({
            top: 3,
            left: 0,
            width: '33%',
            height: 10,
            label: 'System Info',
            border: {
                type: 'line'
            },
            style: {
                fg: 'white',
                border: {
                    fg: '#f0f0f0'
                }
            }
        });
        this.screen.append(this.systemInfoBox);

        // CPU Paneli
        this.cpuBox = blessed.box({
            top: 3,
            left: '33%',
            width: '33%',
            height: 10,
            label: 'CPU Usage',
            border: {
                type: 'line'
            },
            style: {
                fg: 'white',
                border: {
                    fg: '#f0f0f0'
                }
            }
        });
        this.screen.append(this.cpuBox);

        // Bellek Paneli
        this.memoryBox = blessed.box({
            top: 3,
            left: '66%',
            width: '34%',
            height: 10,
            label: 'Memory Usage',
            border: {
                type: 'line'
            },
            style: {
                fg: 'white',
                border: {
                    fg: '#f0f0f0'
                }
            }
        });
        this.screen.append(this.memoryBox);

        // Disk Paneli
        this.diskBox = blessed.box({
            top: 13,
            left: 0,
            width: '50%',
            height: 10,
            label: 'Disk Usage',
            border: {
                type: 'line'
            },
            style: {
                fg: 'white',
                border: {
                    fg: '#f0f0f0'
                }
            }
        });
        this.screen.append(this.diskBox);

        // Ağ Paneli
        this.networkBox = blessed.box({
            top: 13,
            left: '50%',
            width: '50%',
            height: 10,
            label: 'Network',
            border: {
                type: 'line'
            },
            style: {
                fg: 'white',
                border: {
                    fg: '#f0f0f0'
                }
            }
        });
        this.screen.append(this.networkBox);

        // Git Paneli
        this.gitBox = blessed.box({
            top: 23,
            left: 0,
            width: '50%',
            height: 10,
            label: 'Git Status',
            border: {
                type: 'line'
            },
            style: {
                fg: 'white',
                border: {
                    fg: '#f0f0f0'
                }
            }
        });
        this.screen.append(this.gitBox);

        // Süreçler Paneli
        this.processBox = blessed.box({
            top: 23,
            left: '50%',
            width: '50%',
            height: 10,
            label: 'Top Processes',
            border: {
                type: 'line'
            },
            style: {
                fg: 'white',
                border: {
                    fg: '#f0f0f0'
                }
            }
        });
        this.screen.append(this.processBox);

        // Log Paneli
        this.logBox = blessed.log({
            top: 33,
            left: 0,
            width: '100%',
            height: 10,
            label: 'System Logs',
            border: {
                type: 'line'
            },
            scrollable: true,
            input: true,
            scrollbar: {
                ch: ' ',
                inverse: true
            },
            keys: true,
            vi: true,
            mouse: true,
            style: {
                fg: 'white',
                border: {
                    fg: '#f0f0f0'
                }
            }
        });
        this.screen.append(this.logBox);

        // Footer
        this.footerBox = blessed.box({
            bottom: 0,
            left: 0,
            width: '100%',
            height: 2,
            content: '{center}Last Update: Loading... | Press \'q\' to quit{/center}',
            tags: true,
            style: {
                fg: 'white',
                bg: 'blue'
            }
        });
        this.screen.append(this.footerBox);
    }

    async updateData() {
        try {
            // Sistem bilgilerini güncelle
            await this.updateSystemInfo();

            // CPU bilgilerini güncelle
            await this.updateCPUInfo();

            // Bellek bilgilerini güncelle
            await this.updateMemoryInfo();

            // Disk bilgilerini güncelle
            await this.updateDiskInfo();

            // Ağ bilgilerini güncelle
            await this.updateNetworkInfo();

            // Git bilgilerini güncelle
            await this.updateGitInfo();

            // Süreç bilgilerini güncelle
            await this.updateProcessInfo();

            // Footer'ı güncelle
            this.footerBox.setContent(`{center}Last Update: ${moment().format('HH:mm:ss')} | Press 'q' to quit{/center}`);

            // Ekranı yenile
            this.screen.render();
        } catch (error) {
            this.logBox.log(`Error: ${error.message}`);
        }
    }

    async updateSystemInfo() {
        try {
            const osInfo = await si.osInfo();
            const system = await si.system();
            const uuid = await si.uuid();

            this.systemInfoBox.setContent(
                `OS: ${osInfo.distro} ${osInfo.release}\n` +
                `Hostname: ${osInfo.hostname}\n` +
                `Architecture: ${osInfo.arch}\n` +
                `Device: ${system.model}\n` +
                `Serial: ${uuid.os.substring(0, 8)}...`
            );
        } catch (error) {
            this.systemInfoBox.setContent(`Error: ${error.message.substring(0, 50)}`);
        }
    }

    async updateCPUInfo() {
        try {
            const cpuCurrentSpeed = await si.cpuCurrentSpeed();
            const cpuLoad = await si.currentLoad();
            const cpu = await si.cpu();

            // CPU kullanım çubuğu
            const usagePercent = Math.round(cpuLoad.currentLoad);
            const barLength = 20;
            const filledBars = Math.round((usagePercent / 100) * barLength);
            const emptyBars = barLength - filledBars;
            const progressBar = '[' + '='.repeat(filledBars) + ' '.repeat(emptyBars) + ']';

            this.cpuBox.setContent(
                `Model: ${cpu.brand.substring(0, 20)}\n` +
                `Cores: ${cpu.cores} (${cpu.physicalCores} phys)\n` +
                `Frequency: ${cpuCurrentSpeed.avg} GHz\n` +
                `Usage: ${usagePercent}%\n` +
                `${progressBar}`
            );
        } catch (error) {
            this.cpuBox.setContent(`Error: ${error.message.substring(0, 50)}`);
        }
    }

    async updateMemoryInfo() {
        try {
            const mem = await si.mem();

            // Bellek kullanım çubuğu
            const usagePercent = Math.round((mem.active / mem.total) * 100);
            const barLength = 20;
            const filledBars = Math.round((usagePercent / 100) * barLength);
            const emptyBars = barLength - filledBars;
            const progressBar = '[' + '='.repeat(filledBars) + ' '.repeat(emptyBars) + ']';

            this.memoryBox.setContent(
                `Total: ${(mem.total / 1024 / 1024 / 1024).toFixed(2)} GB\n` +
                `Used: ${(mem.used / 1024 / 1024 / 1024).toFixed(2)} GB\n` +
                `Free: ${(mem.free / 1024 / 1024 / 1024).toFixed(2)} GB\n` +
                `Usage: ${usagePercent}%\n` +
                `${progressBar}`
            );
        } catch (error) {
            this.memoryBox.setContent(`Error: ${error.message.substring(0, 50)}`);
        }
    }

    async updateDiskInfo() {
        try {
            const fsSize = await si.fsSize();
            let content = '';

            fsSize.slice(0, 3).forEach((disk, index) => {
                const usagePercent = Math.round(disk.use);
                const barLength = 15;
                const filledBars = Math.round((usagePercent / 100) * barLength);
                const emptyBars = barLength - filledBars;
                const progressBar = '[' + '='.repeat(filledBars) + ' '.repeat(emptyBars) + ']';

                content += `${disk.fs}: ${usagePercent}%\n`;
                content += `${progressBar} ${(disk.size / 1024 / 1024 / 1024).toFixed(1)}GB\n\n`;
            });

            this.diskBox.setContent(content);
        } catch (error) {
            this.diskBox.setContent(`Error: ${error.message.substring(0, 50)}`);
        }
    }

    async updateNetworkInfo() {
        try {
            const networkStats = await si.networkStats();
            const networkInterfaces = await si.networkInterfaces();

            if (networkStats.length > 0) {
                const stats = networkStats[0];
                const iface = networkInterfaces.find(i => i.iface === stats.iface) || {};

                this.networkBox.setContent(
                    `Interface: ${stats.iface}\n` +
                    `IP: ${iface.ip4 || 'N/A'}\n` +
                    `RX: ${(stats.rx_bytes / 1024 / 1024).toFixed(2)} MB\n` +
                    `TX: ${(stats.tx_bytes / 1024 / 1024).toFixed(2)} MB\n` +
                    `Speed: ${iface.speed || 'N/A'} Mbps`
                );
            }
        } catch (error) {
            this.networkBox.setContent(`Error: ${error.message.substring(0, 50)}`);
        }
    }

    async updateGitInfo() {
        try {
            // Geçerli dizini al
            const currentDir = process.cwd();

            // Git reposu kontrolü
            if (fs.existsSync(path.join(currentDir, '.git'))) {
                const git = simpleGit(currentDir);
                const status = await git.status();
                const branch = await git.branch();

                this.gitBox.setContent(
                    `Repo: ${path.basename(currentDir)}\n` +
                    `Branch: ${branch.current}\n` +
                    `Changes: ${status.files.length} file(s)\n` +
                    `Staged: ${status.staged.length}\n` +
                    `Modified: ${status.modified.length}`
                );
            } else {
                this.gitBox.setContent(
                    `Not a git repository\n` +
                    `Current Dir: ${currentDir.substring(0, 30)}...\n\n` +
                    `Tip: Run in a git repo for status`
                );
            }
        } catch (error) {
            this.gitBox.setContent(`Error: ${error.message.substring(0, 50)}`);
        }
    }

    async updateProcessInfo() {
        try {
            const processes = await si.processes();
            let content = '';

            // En çok CPU kullanan 5 süreci sırala
            const topProcesses = processes.list
                .filter(p => p.pid !== 0)
                .sort((a, b) => b.cpu - a.cpu)
                .slice(0, 5);

            topProcesses.forEach((proc, index) => {
                content += `[${index + 1}] ${proc.name.substring(0, 15)} (${proc.pid})\n`;
                content += `    CPU: ${proc.cpu.toFixed(1)}% MEM: ${proc.mem.toFixed(1)}%\n\n`;
            });

            this.processBox.setContent(content);
        } catch (error) {
            this.processBox.setContent(`Error: ${error.message.substring(0, 50)}`);
        }
    }

    log(message) {
        this.logBox.log(`[${moment().format('HH:mm:ss')}] ${message}`);
    }
}

// Uygulamayı başlat
const dashboard = new TerminalDashboard();

// Başlangıç mesajı
dashboard.log('Hyperion Terminal Dashboard started');
dashboard.log('Loading system information...');