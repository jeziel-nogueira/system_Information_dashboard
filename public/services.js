import os from 'node:os';
import osu from 'os-utils';
import { getDiskInfo } from 'node-disk-info';

// Função para obter o disco principal dependendo do sistema operacional
function getMainDisk(disks) {
    if (os.platform() === 'win32') {
        return disks.find(disk => disk.mounted === 'C:' || disk.filesystem === 'C:');
    } else {
        // Para sistemas Unix, pode ser que o disco principal não esteja sempre em '/'
        return disks.find(disk => disk.mounted === '/' || disk.filesystem.includes('ext'));
    }
}

// Função para converter bytes em GB
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
        return Math.round(os.totalmem() / 1073741824); // Total em GB
    }

    function getFreeMemory() {
        return bytesToGB(os.freemem());
    }

    function getCpuModel() {
        return os.cpus()[0]?.model || 'Unknown CPU Model'; // Verifica se há CPUs
    }

    function getCpuMaxSpeed() {
        return os.cpus()[0]?.speed || 'Unknown Speed'; // Verifica se há CPUs
    }

    function getTotalCpuCores() {
        return os.cpus().length || 0;
    }

    function getOsName() {
        const osType = os.type();
        const osRelease = os.release();
        const osVersion = os.version();
        return `${osType} ${osRelease} (${osVersion})`; // Formato legível
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
        // try {
        //     const disks = await getDiskInfo();
        //     let diskInfo;

        //     if (os.platform() === 'win32') {
        //         // No Windows, buscar o disco 'C:'
        //         diskInfo = disks.find(disk => disk.mounted === 'C:' || disk.filesystem === 'C:');
        //     } else {
        //         // Em sistemas Unix, buscar o disco montado em '/' ou qualquer outro que contenha 'ssd' no nome
        //         diskInfo = disks.find(disk => disk.mounted === '/' || /ssd/i.test(disk.filesystem));
        //     }

        //     if (diskInfo) {
        //         return {
        //             total: Math.round(diskInfo.blocks / 1073741824), // Total em GB
        //             free: parseFloat(bytesToGB(diskInfo.available)) // Livre em GB
        //         };
        //     } else {
        //         console.error('Disco principal não encontrado.');
        //         return { total: 0, free: 0 };
        //     }
        // } catch (error) {
        //     console.error('Erro ao obter informações do disco:', error);
        //     return { total: 0, free: 0 };
        // }

        try {
            // Obtém informações de todos os discos
            const disks = await getDiskInfo();
            // Seleciona o disco principal de acordo com o sistema operacional
            diskInfo = getMainDisk(disks);

            if (!diskInfo) {
                throw new Error('Disco principal não encontrado');
            } else {
                return {
                    total: Math.round(diskInfo.blocks / 1073741824), // Total em GB
                    free: parseFloat(bytesToGB(diskInfo.available)) // Livre em GB
                }
            }
        } catch (err) {
            console.error(err);
            return 'Failed to retrieve disk info';
        }

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
