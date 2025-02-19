# Qnect - System Design Judge

A web-based platform that allows developers to create, visualize and validate system design diagrams with AI-powered feedback.

## Overview

Qnect is an interactive system design tool that helps developers:

- Create system architecture diagrams with an intuitive drag-and-drop interface
- Use pre-built components like API Gateways, Databases, Load Balancers etc.
- Get real-time AI feedback on design patterns, scalability and best practices
- Learn system design through detailed recommendations and improvements

## Features

### Component Library

- Extensive collection of common system design components including:
  - Infrastructure (AWS, Azure, GCP, Kubernetes)
  - Databases (MongoDB, PostgreSQL, Redis)
  - Network (Load Balancer, API Gateway, CDN)
  - And many more...

### Interactive Design Canvas

- Drag-and-drop interface using [ReactFlow](https://reactflow.dev)
- Connect components with labeled edges
- Resize and customize components
- Mini-map for easy navigation
- Zoom and pan controls

### AI Design Evaluation

The backend evaluates designs and provides feedback on:

- Must-have components for the system
- Good-to-have components for scalability
- Prohibited component connections
- Recommended connection patterns
- Best practices and improvements

## Getting Started

1. Install dependencies:

```bash
npm install
```
