import os from 'node:os'
import osu from 'os-utils';
import { getDiskInfo } from 'node-disk-info';

function getMainDisk(disks) {
    if (os.platform() === 'win32') {
        // No Windows, buscar o disco 'C:'
        return disks.find(disk => disk.mounted === 'C:' || disk.filesystem === 'C:');
    } else {
        // Em sistemas Unix, buscar o disco montado em '/'
        return disks.find(disk => disk.mounted === '/');
    }
}

const bytesToGB = (bytes) => (bytes / (1024 ** 3)).toFixed(2);

export default function getMetrics() {

    function getUserIp() {
        const interfaces = os.networkInterfaces();

        // Loop pelas interfaces de rede
        for (let iface in interfaces) {
            // Verifica se a interface tem múltiplos endereços
            for (let i = 0; i < interfaces[iface].length; i++) {
                const alias = interfaces[iface][i];

                // Verifica se o endereço é IPv4 e se não é um endereço interno (localhost)
                if (alias.family === 'IPv4' && !alias.internal) {
                    return alias.address;  // Retorna o IP da interface correta
                }
            }
        }

        return 'IP not found';  // Caso não encontre o IP
    }

    function getTotalRamMemory() {
        return Math.round(os.totalmem() / 1073741824);
    }

    function getFreeMemory() {
        return bytesToGB(os.freemem()); //Math.round(os.freemem() / 1073741824);
    }

    function getCpuModel() {
        return os.cpus()[0].model;
    }

    function getCpuMaxSpeed() {
        return os.cpus()[0].speed;
    }

    function getTotalCpuCores() {
        return os.cpus().length;
    }

    function getOsName() {
        return os.version();// `${os.type()}: ${os.version()}: ${os.release()}`;
    }

    function getOsArchitecture() {
        return os.machine();
    }

    function getCpuUsage() {
        return new Promise((resolve, reject) => {
            osu.cpuUsage((usage) => {
                resolve((usage * 100).toFixed(2));  // Multiplica por 100 para transformar em porcentagem
            });
        });
    }

    async function getMainDiskSize() {
        try {
            const disks = await getDiskInfo();
            const diskInfo = getMainDisk(disks);

            const info = {
                total: Math.round(diskInfo.blocks / 1073741824),
                free: parseFloat(bytesToGB(diskInfo.available))
            }

            // if (diskInfo) {
            //     console.log(`Espaço disponível: ${bytesToGB(diskInfo.available)} GB`);
            //     console.log(`Tamanho total: ${bytesToGB(diskInfo.blocks)} GB`);
            // } else {
            //     console.log('Não foi possível encontrar o disco principal.');
            // }
            return info; // `${bytesToGB(diskInfo.available)}Gb free of ${Math.round(diskInfo.blocks / 1073741824)}Gb`;
        } catch (error) {
            console.error('Erro ao obter informações do disco:', error);
            return 0;
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
    }
}