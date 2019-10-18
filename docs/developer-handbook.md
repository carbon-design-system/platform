# Developer handbook

## Building local images

**Shared builder**

```bash
docker build -t carbon/platform-build -f Dockerfile.build .
```

**Platform UI Service**

```bash
docker build -t carbon/platform-ui ui
```

## Running a service

**Platform UI Service**

```bash
export SHOULD_REDIRECT_HTTPS=false
docker run -d -p 3000:3000 carbon/platform-ui:0.0.0
# Visit https://localhost:3000
```

## Operations

**Connect to IBM Cloud**

```bash
ibmcloud login --sso
```

**Add `KUBECONFIG` environment variable**

```bash
# Find the cluster id that you'd like to connect to
ibmcloud ks cluster ls

# Get the command to run to export KUBECONFIG
ibmcloud ks cluster config --cluster <CLUSTER_ID> --export

# Run the command returned from above, looks like:
export KUBECONFIG=abcd
```

### FAQ

#### Interacting with resources

Types of resources you can interact with:

- `deployments`
- `services`
- `pods`

Operations you can perform:

- `get`
- `delete`

Putting it together:

```bash
# For listing resources
kubectl <operation> <resource>
# For performing actions on a resource
kubectl <operation> <resource> <resource-name>
```

#### Debugging services

https://kubernetes.io/docs/tasks/debug-application-cluster/debug-service/

```bash
kubectl run -it --rm --restart=Never alpine --image=alpine sh
```
