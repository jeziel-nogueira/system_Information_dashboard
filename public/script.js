async function fetch_metrics() {
  const response = await fetch('/metrics')
  return await response.json();
}

const cpu_total_cores = document.getElementById('cpu_total_cores');
const cpu_model = document.getElementById('cpu_model');
const cpu_model_card = document.getElementById('cpu_model_card');
const cpu_max_speed = document.getElementById('cpu_max_speed');
const total_ram_memory = document.getElementById('total_ram_memory');
const main_diskSize = document.getElementById('main_diskSize');
const os_name = document.getElementById('os_name');
const os_name_card = document.getElementById('os_name_card');
const os_architecture = document.getElementById('os_architecture');
const user = document.getElementById('user_ip');

const ctx_line_Chart = document.getElementById('line_Chart');
const ctx_doughnut = document.getElementById('doughnut');

const cpuUsageData = {
  labels: [], 
  datasets: [{
    label: 'CPU Usage (%)',
    data: [], 
    backgroundColor: 'rgba(255, 206, 86, 1)',
    borderColor: 'rgb(41, 155, 99)',
    borderWidth: 1,
    fill: true
  }]
};

const lineChart = new Chart(ctx_line_Chart, {
  type: 'line',
  data: cpuUsageData,
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100 // O uso de CPU será representado como porcentagem (0% a 100%)
      }
    }
  }
});

function updateCpuUsageChart(cpu_usage) {
  const currentTime = new Date().toLocaleTimeString();
  if (cpuUsageData.labels.length > 10) {
    cpuUsageData.labels.shift();
    cpuUsageData.datasets[0].data.shift();
  }
  cpuUsageData.labels.push(currentTime);
  cpuUsageData.datasets[0].data.push(cpu_usage);
  lineChart.update();
}

const diskData = {
  labels: ['Disk Used', 'Disk Free'],
  datasets: [{
    data: [],
    backgroundColor: [
      'rgba(255, 206, 86, 1)',  // Disco Usado
      'rgba(75, 192, 192, 1)'   // Disco Livre
    ],
    borderColor: [
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)'
    ],
    borderWidth: 1
  }]
};

const doughnutChart = new Chart(ctx_doughnut, {
  type: 'doughnut',
  data: diskData,
  options: {
    responsive: true,
    plugins: {
      datalabels: {
        display: true,
        align: 'bottom',
        backgroundColor: '#ccc',
        borderRadius: 3,
        font: {
          size: 18,
        },
      },
    },
  }
});

function updateDiskChart(disk_info) {

  console.log(disk_info);  
  
  diskData.datasets[0].data = [
    disk_info.total - disk_info.free, disk_info.free
  ];
  doughnutChart.update();
}

function setOsName(name) {
  os_name.innerHTML = name;
  os_name_card.innerHTML = name;
}

function setUser(user_ip) {
  user.innerHTML = `IPV4: ${user_ip}`
}

function setOsArchitecture(architecture) {
  os_architecture.innerHTML = architecture;
}


function setCpuMaxSpeed(max_speed) {
  cpu_max_speed.innerHTML = `Max Speed: @${max_speed}MHz`
}

function setCpuCores(total_cores) {
  cpu_total_cores.innerHTML = `Total Cores: ${total_cores}`;
}

function setCpuModel(model) {
  cpu_model.innerHTML = model;
  cpu_model_card.innerHTML = model;
}

function setTotalRamMemory(total_ram, free_ram) {
  total_ram_memory.innerHTML = `${free_ram}Gb free of ${total_ram}Gb`;
}

function setMainDiskSize(disk_size) {
  main_diskSize.innerHTML = `Size: ${disk_size.total}Gb`;
}


setInterval(async () => {
  const metrics = await fetch_metrics();

  // Atualizar informações de texto
  setUser(metrics.user_ip);
  setCpuCores(metrics.cpu_cores);
  setCpuModel(metrics.cpu_model);
  setCpuMaxSpeed(metrics.cpu_max_speed);
  setTotalRamMemory(metrics.total_ram_memory, metrics.total_ram_memory_free);
  setMainDiskSize(metrics.main_disk_size);
  setOsName(metrics.os_name);
  setOsArchitecture(metrics.architecture);

  // Atualizar os gráficos
  updateCpuUsageChart(metrics.cpu_usage);
  updateDiskChart(metrics.main_disk_size);

}, 3000);