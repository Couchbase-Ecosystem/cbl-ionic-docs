"use strict";(self.webpackChunkcbl_ionic=self.webpackChunkcbl_ionic||[]).push([[5495],{1923:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>s,contentTitle:()=>c,default:()=>u,frontMatter:()=>a,metadata:()=>r,toc:()=>l});var o=n(4848),i=n(8453);const a={id:"build-run",sidebar_position:3},c="Build and Run",r={id:"StartHere/build-run",title:"Build and Run",description:"Quick Steps",source:"@site/docs/StartHere/build-run.md",sourceDirName:"StartHere",slug:"/StartHere/build-run",permalink:"/StartHere/build-run",draft:!1,unlisted:!1,editUrl:"https://github.com/Couchbase-Ecosystem/cbl-ionic-docs/docs/StartHere/build-run.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{id:"build-run",sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Install",permalink:"/StartHere/install"},next:{title:"Databases",permalink:"/databases"}},s={},l=[{value:"Quick Steps",id:"quick-steps",level:2}];function d(t){const e={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...t.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(e.h1,{id:"build-and-run",children:"Build and Run"}),"\n",(0,o.jsx)(e.h2,{id:"quick-steps",children:"Quick Steps"}),"\n",(0,o.jsx)(e.p,{children:"Ionic Capacitor provides several tools for building and runnig your Capacitor app. You can find more information on building and running from the Capacitor documentation."}),"\n",(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsxs)(e.li,{children:["[Capacitor CLI] (",(0,o.jsx)(e.a,{href:"https://capacitorjs.com/docs/cli",children:"https://capacitorjs.com/docs/cli"}),")"]}),"\n",(0,o.jsxs)(e.li,{children:["[Capacitor iOS] (",(0,o.jsx)(e.a,{href:"https://capacitorjs.com/docs/ios",children:"https://capacitorjs.com/docs/ios"}),")"]}),"\n",(0,o.jsxs)(e.li,{children:["[Capacitor Android] (",(0,o.jsx)(e.a,{href:"https://capacitorjs.com/docs/android",children:"https://capacitorjs.com/docs/android"}),")"]}),"\n"]}),"\n",(0,o.jsx)(e.p,{children:"The Ionic CLI also provides the ability to run capacitor apps:"}),"\n",(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsxs)(e.li,{children:["[Ionic CLI] (",(0,o.jsx)(e.a,{href:"https://capacitorjs.com/docs/getting-started/with-ionic",children:"https://capacitorjs.com/docs/getting-started/with-ionic"}),")"]}),"\n"]}),"\n",(0,o.jsx)(e.p,{children:"A very common set of commands to build and run your app are:"}),"\n",(0,o.jsx)(e.p,{children:(0,o.jsx)(e.strong,{children:"iOS"})}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-shell",children:"ionic capacitor run ios --livereload external\n"})}),"\n",(0,o.jsx)(e.p,{children:(0,o.jsx)(e.strong,{children:"Android"})}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-shell",children:"ionic capacitor run android -l --external\n"})}),"\n",(0,o.jsx)(e.p,{children:"These commands will list the available devices and prompt you to select one. If you have a device connected, it will automatically select that device. If you have multiple devices or simulators running, you will be prompted to select one."}),"\n",(0,o.jsx)(e.p,{children:"The following code snippet is a basic example on how to do CRUD operations and optionally running bi-directional sync with Sync Gateway in Typescript."}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-typescript",children:"import {\n\tDatabase,\n\tDatabaseConfiguiration,\n\tFileSystem,\n\tCollection,\n\tQuery,\n\tMutableDocument,\n\tBasicAuthenticator,\n\tReplicator,\n\tReplicatorActivityLevel,\n\tReplicatorConfiguration,\n\tReplicatorType,\n\tURLEndpoint\n} from 'cbl-ionic';\n\n\nasync function runDbSample() : Promise<void> {\n try {\n //get a file path that you can write the database file to for each platform\n const fileSystem = new FileSystem();\n const directoryPath = await fileSystem.getDefaultPath();\n\n const dc = new DatabaseConfiguration();\n dc.setDirectory(directoryPath);\n const database = new Database('travel', dc);\n\n await database.open();\n const collection = database.getDefaultCollection();\n\n //create a document\n const mutableDoc = new MutableDocument('doc-1');\n mutableDoc.setFloat('version', 3.1);\n mutableDoc.setString('type', 'SDK');\n\n //save it to the database\n await collection.save(mutableDoc);\n\n //update the document\n const mutableDoc2 = await collection.document('doc-1');\n mutableDoc2.setString('language', 'Typescript');\n await collection.save(mutableDoc2);\n\n //create a query to get the documents of type SDK\n const query = database.createQuery('SELECT * FROM _default._default WHERE type = \"SDK\"');\n\n //run the query\n const results = await query.execute();\n\n console.log('Number of documents of type SDK: ' + results.length);\n\n //loop through the results and do something with them\n for (const item of results) {\n \t//to something with the data\n\tconst doc = item['_default'];\t\n\tconsole.log(doc.type);\n\tconsole.log(doc.language);\n }\n\n //assumes you are running sync gateway locally, if you are \n //running app services, replace enpoint with proper url and creditentials\n const target = new URLEndpoint('ws://localhost:4984/projects');\n const auth = new BasicAuthenticator('demo@example.com', 'P@ssw0rd12');\n const config = new ReplicatorConfiguration(target);\n config.addCollection(this.collection);\n config.setAuthenticator(auth);\n\n const replicator = await Replicator.create(config);\n\n //listen to the replicator change events\n const token = await replicator.addChangeListener((change) => {\n\t//check to see if there was an error\n   \tconst error = change.status.getError();\n  \tif (error !== undefined) {\n\t\t//do something with the error\n   \t}\n   \t//get the status of the replicator using ReplicatorActivityLevel enum\n  \tif (change.status.getActivityLevel() ===  ReplicatorActivityLevel.IDLE) {\n   \t\t//do something because the replicator is now IDLE\n   \t}\n });\n\n // start the replicator without making a new checkpoint\n await replicator.start(false);\n\n //remember you must clean up the replicator when done with it by \n //doing the following lines\n\n //await replicator.removeChangeListener(token);\n //await replicator.stop();\n\n } catch (e) {\n\tconsole.error(e);\n }\n}\n"})})]})}function u(t={}){const{wrapper:e}={...(0,i.R)(),...t.components};return e?(0,o.jsx)(e,{...t,children:(0,o.jsx)(d,{...t})}):d(t)}},8453:(t,e,n)=>{n.d(e,{R:()=>c,x:()=>r});var o=n(6540);const i={},a=o.createContext(i);function c(t){const e=o.useContext(a);return o.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function r(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(i):t.components||i:c(t.components),o.createElement(a.Provider,{value:e},t.children)}}}]);