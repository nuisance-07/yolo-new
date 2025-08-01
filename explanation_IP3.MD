Stage 2: Vagrant and Ansible Orchestration for Yolo E-Commerce Application
This document details the Vagrantfile setup, Ansible playbook setup, and deployment process for the Yolo E-Commerce Application in the stage-two branch, with screenshots.
Vagrantfile Setup
The Vagrantfile configures a VirtualBox VM to host the application using geerlingguy/ubuntu2004.

Configuration:

Box: Ubuntu 20.04.
Hostname: ecommerce-server.
Port Forwarding: 3000:3000 (frontend), 5000:5000 (backend), 27017:27017 (MongoDB).
Private Network: Static IP 192.168.56.3.
Synced Folder: Maps ~/yolo-new to /home/vagrant/yolo.
Provider: 2GB RAM, 2 CPUs.
Ansible Provisioning: Runs playbook.yml targeting ecommerce-server.


Vagrantfile Contents:
Vagrant.configure("2") do |config|
  config.vm.box = "geerlingguy/ubuntu2004"
  config.vm.hostname = "ecommerce-server"
  config.vm.network "private_network", ip: "192.168.56.3"
  config.vm.network "forwarded_port", guest: 3000, host: 3000, host_ip: "127.0.0.1"
  config.vm.network "forwarded_port", guest: 5000, host: 5000, host_ip: "127.0.0.1"
  config.vm.network "forwarded_port", guest: 27017, host: 27017, host_ip: "127.0.0.1"
  config.vm.synced_folder ".", "/home/vagrant/yolo"
  config.vm.provider "virtualbox" do |vb|
    vb.memory = 2048
    vb.cpus = 2
  end
  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "playbook.yml"
    ansible.inventory_path = "inventory.yml"
    ansible.limit = "ecommerce-server"
  end
end


Verification:
vagrant ssh -c "hostname"
vagrant ssh -c "ip addr show | grep 192.168.56"


Expected: ecommerce-server, 192.168.56.3.
Screenshot:
![alt text]
(<Screenshot from 2025-08-01 04-15-35.png>)


Playbook Setup
The Ansible playbook (playbook.yml) targets ecommerce-server to deploy containers using roles. The inventory file (inventory.yml) defines the VM’s connection details.

Inventory Configuration (inventory.yml):
all:
  hosts:
    ecommerce-server:
      ansible_host: 127.0.0.1
      ansible_port: 2222
      ansible_user: vagrant
      ansible_ssh_private_key_file: /home/collins/yolo-new/.vagrant/machines/default/virtualbox/private_key
      ansible_ssh_common_args: '-o PubkeyAcceptedKeyTypes=+ssh-rsa -o HostKeyAlgorithms=+ssh-rsa'


Verification:cat inventory.yml


Screenshot:
![alt text]
(<Screenshot from 2025-08-01 04-10-49.png>)



Playbook Structure (playbook.yml):
- name: Deploy e-commerce application
  hosts: ecommerce-server
  become: true
  vars_files:
    - vars/main.yml
  roles:
    - common
    - backend
    - frontend-deployment


Uses vars/main.yml for container settings.
Roles: common (installs Docker, Git, creates network), backend (deploys MongoDB and backend), frontend-deployment (deploys frontend).
Verification:cat playbook.yml


Screenshot:
![alt text]
(<Screenshot from 2025-08-01 04-11-15.png>)



Variables (vars/main.yml):
repo_url: "https://github.com/nuisance-07/yolo.git"
repo_dest: "/home/vagrant/yolo"
frontend_container:
  name: "container-ya-frontend"
  image: "mwas121/yolo-client:1.0.0"
  port_mapping: "3000:80"
  volume_mapping: "{{ repo_dest }}/client:/app"
  env_vars:
    REACT_APP_API_URL: "http://192.168.56.3:5000/api/products"
  network: "yolo-net"
backend_container:
  name: "container-ya-backend"
  image: "mwas121/yolo-backend:1.0.0"
  port_mapping: "5000:5000"
  env_vars:
    MONGO_URL: "mongodb://container-ya-mongo:27017/yolomy"
  network: "yolo-net"
db_container:
  name: "container-ya-mongo"
  image: "mongo:4.4"
  port_mapping: "27017:27017"
  volume_mapping: "mongo-data:/data/db"
  env_vars:
    MONGO_INITDB_DATABASE: "yolomy"
  network: "yolo-net"
network_name: "yolo-net"


Verification:cat vars/main.yml


Screenshot:
![alt text]
(<Screenshot from 2025-08-01 04-12-01.png>)






Deployment Process
The deployment process involves running the Ansible playbook, verifying containers, and testing functionality and persistence.

Step 1: Deploy with Ansible:
cd ~/yolo-new
ansible-playbook -i inventory.yml playbook.yml


Screenshot:
![alt text]
(<Screenshot from 2025-08-01 04-13-08.png>)
![alt text]
(<Screenshot from 2025-08-01 04-13-23.png>)
Step 2: Verify Containers:
vagrant ssh -c "docker ps"


Expected: Shows container-ya-frontend, container-ya-backend, container-ya-mongo.
Screenshot:
![alt text]
(<Screenshot from 2025-08-01 04-13-58.png>)



Step 3: Test MongoDB Persistence:
vagrant ssh -c "docker stop container-ya-mongo && docker start container-ya-mongo"


Expected: container-ya-mongo stops and starts.
Screenshot:
![alt text]
(<Screenshot from 2025-08-01 04-15-35.png>)






Step 4: Verify Frontend:
echo "Open http://localhost:3000 in a browser"


Expected: 
Screenshot:
![
    
](<Screenshot from 2025-08-01 04-14-40.png>)
