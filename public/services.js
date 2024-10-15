import os from 'node:os';
import osu from 'os-utils';
import { getDiskInfo } from 'node-disk-info';

//const bytesToGB = (bytes) => ((bytes * 1024) / 1073741824).toFixed(2);
const bytesToGB = (bytes) => (bytes / (1024 ** 3)).toFixed(2);

export default function getMetrics() {

    function getUserIp() {
        const interfaces = os.networkInterfaces();

        for (let iface in interfaces) {
            for (let i = 0; i < interfaces[iface].length; i++) {
                const alias = interfaces[iface][i];

                if (alias.family === 'IPv4' && !alias.internal) {
                    return alias.address;
                }
            }
        }

        return 'IP not found';
    }

    function getTotalRamMemory() {
        console.log(`Total mem: ${os.totalmem()}`)
        return Math.round(os.totalmem() / 1073741824); 
    }

    function getFreeMemory() {
        console.log(`Free mem: ${os.freemem()}`)
        return bytesToGB(os.freemem());
    }

    function getCpuModel() {
        return os.cpus()[0]?.model || 'Unknown CPU Model';
    }

    function getCpuMaxSpeed() {
        return os.cpus()[0]?.speed || 'Unknown Speed';
    }

    function getTotalCpuCores() {
        return os.cpus().length || 0;
    }

    function getOsName() {
        const osType = os.type();
        const osRelease = os.release();
        const osVersion = os.version();
        return `${osType} ${osRelease} (${osVersion})`; 
    }

    function getOsArchitecture() {
        return os.arch();
    }

    function getCpuUsage() {
        return new Promise((resolve, reject) => {
            osu.cpuUsage((usage) => {
                resolve((usage * 100).toFixed(2));
            });
        });
    }

    async function getMainDiskSize() {
        let diskInfo;
        let totalGB;
        let freeGB;

        try {
            const disks = await getDiskInfo();

            if (os.platform() === 'win32') {
                diskInfo = disks.find(disk => disk.mounted === 'C:' || disk.filesystem === 'C:');

                totalGB = Math.round(diskInfo.blocks / 1073741824)
                freeGB = parseFloat((diskInfo.available /(1024 ** 3)).toFixed(2))
            } else {

                diskInfo = disks.find(disk => disk.mounted === '/' );
                totalGB = Math.round((diskInfo.blocks * 1024) / 1073741824);
                freeGB = parseFloat(((diskInfo.available * 1024) / 1073741824).toFixed(2));
            }            
            
        } catch (err) {
            console.error(err);
            return { error: 'Failed to retrieve disk info' };
        }

        return {
            total: totalGB,
            free: freeGB
        };
    }

    return {
        getUserIp,
        getTotalCpuCores,
        getCpuModel,
        getCpuMaxSpeed,
        getCpuUsage,
        getTotalRamMemory,
        getFreeMemory,
        getMainDiskSize,
        getOsName,
        getOsArchitecture,
    };
}
