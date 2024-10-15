import express from 'express';
import getMetrics from './public/services.js';

const PORT = 3001;
const APP = express();

APP.use(express.static('public'));

APP.get('/metrics', async (req, res) => {
    const metrics = getMetrics();

    try {    
        
        res.status(200).json({
            user_ip: metrics.getUserIp(),
            cpu_cores: metrics.getTotalCpuCores(),
            cpu_model: metrics.getCpuModel(),
            cpu_max_speed: metrics.getCpuMaxSpeed(),
            cpu_usage : await metrics.getCpuUsage(),
            total_ram_memory: metrics.getTotalRamMemory(),
            total_memory_free: metrics.getFreeMemory(),
            main_disk_size: await metrics.getMainDiskSize(),
            os_name: metrics.getOsName(),
            architecture: metrics.getOsArchitecture(),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error reading CPU cores' });
    }
});

APP.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
