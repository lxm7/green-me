import "sst/node/config";
declare module "sst/node/config" {
  export interface ConfigTypes {
    APP: string;
    STAGE: string;
  }
}

import "sst/node/table";
declare module "sst/node/table" {
  export interface TableResources {
    "users": {
      tableName: string;
    }
  }
}

import "sst/node/config";
declare module "sst/node/config" {
  export interface ParameterResources {
    "PROFILES_TABLE": {
      value: string;
    }
  }
}

import "sst/node/config";
declare module "sst/node/config" {
  export interface ParameterResources {
    "VENUES_TABLE": {
      value: string;
    }
  }
}

import "sst/node/config";
declare module "sst/node/config" {
  export interface ParameterResources {
    "CHATS_TABLE": {
      value: string;
    }
  }
}

import "sst/node/config";
declare module "sst/node/config" {
  export interface ParameterResources {
    "MESSAGES_TABLE": {
      value: string;
    }
  }
}

import "sst/node/table";
declare module "sst/node/table" {
  export interface TableResources {
    "ProfilesTable": {
      tableName: string;
    }
  }
}

import "sst/node/table";
declare module "sst/node/table" {
  export interface TableResources {
    "VenuesTable": {
      tableName: string;
    }
  }
}

import "sst/node/table";
declare module "sst/node/table" {
  export interface TableResources {
    "ChatsTable": {
      tableName: string;
    }
  }
}

import "sst/node/table";
declare module "sst/node/table" {
  export interface TableResources {
    "MessagesTable": {
      tableName: string;
    }
  }
}

import "sst/node/api";
declare module "sst/node/api" {
  export interface ApiResources {
    "api": {
      url: string;
    }
  }
}

import "sst/node/site";
declare module "sst/node/site" {
  export interface NextjsSiteResources {
    "site": {
      url: string;
    }
  }
}

import "sst/node/config";
declare module "sst/node/config" {
  export interface SecretResources {
    "FACEBOOK_APP_ID": {
      value: string;
    }
  }
}

import "sst/node/config";
declare module "sst/node/config" {
  export interface SecretResources {
    "FACEBOOK_APP_SECRET": {
      value: string;
    }
  }
}

import "sst/node/config";
declare module "sst/node/config" {
  export interface SecretResources {
    "GOOGLE_CLIENT_ID": {
      value: string;
    }
  }
}

import "sst/node/auth";
declare module "sst/node/auth" {
  export interface AuthResources {
    "auth": {
      publicKey: string;
    }
  }
}

