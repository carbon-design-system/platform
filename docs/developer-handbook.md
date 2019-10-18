# Developer handbook

## Operations

### Connecting to IBM Cloud

- Login to IBM Cloud with `--sso` option
- Download the kubeconfig files for our cluster

### FAQ

#### Debugging services

https://kubernetes.io/docs/tasks/debug-application-cluster/debug-service/

```bash
kubectl run -it --rm --restart=Never alpine --image=alpine sh
```
