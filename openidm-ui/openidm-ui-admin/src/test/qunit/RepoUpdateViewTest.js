// /**
//  * The contents of this file are subject to the terms of the Common Development and
//  * Distribution License (the License). You may not use this file except in compliance with the
//  * License.
//  *
//  * You can obtain a copy of the License at legal/CDDLv1.0.txt. See the License for the
//  * specific language governing permission and limitations under the License.
//  *
//  * When distributing Covered Software, include this CDDL Header Notice in each file and include
//  * the License file at legal/CDDLv1.0.txt. If applicable, add the following below the CDDL
//  * Header, with the fields enclosed by brackets [] replaced by your own identifying
//  * information: "Portions copyright [year] [name of copyright owner]".
//  *
//  * Copyright 2016 ForgeRock AS.
//  */

/* global QUnit */

define([
    "org/forgerock/openidm/ui/admin/settings/update/RepoUpdateView",
    "org/forgerock/openidm/ui/admin/delegates/MaintenanceDelegate",
    "sinon",
    "backbone"
],
 function ( RepoUpdateView, MaintenanceDelegate, sinon, Backbone ) {

    QUnit.module( "RepoUpdateView");

    QUnit.test('calls getUpdateFile once per repoUpdate object', function(assert) {

        var stub = sinon.stub(MaintenanceDelegate, "getUpdateFile", function() {
            // phantomJS doesn't support promises - this prevents having to deal with polyfills
            return {then: function(result) { return result; } };
        }),
        repoUpdatesList = [
            {
                "file": "v2_some_change.sql",
                "path": "db/postgresql/scripts/updates/v2_some_change.sql",
                "contents": "--%20These%20are%20some%20changes%0AALTER%20TABLE%20blah%20...%20sql%20goes%20here"
            },
            {
                "file": "v3_moar_things.sql",
                "path": "db/postgresql/scripts/updates/v3_moar_things.sql",
                "contents": "--%20More%20db%20changes%20yay!%0ACREATE%20TABLE%20newstuff%20..."
            },
            {
                "file": "v11_blah_stuff.sql",
                "path": "db/postgresql/scripts/updates/v11_blah_stuff.sql",
                "contents": "--%20Whoa%20turn%20it%20up%20to%2011%0AUPDATE%20marshall%20SET%20volume%20%3D%2011%20WHERE%20owner%20%3D%20%22nigel%22%3B"
            }
        ],
        result = RepoUpdateView.getRepoUpdate(repoUpdatesList);
        
        assert.ok(stub.calledThrice, "delegate called correctly 3 times");
        assert.equal(typeof(result), "object", "getRepoUpdate returns an object");
        assert.ok(result.models, "result contains an array of models");

        MaintenanceDelegate.getUpdateFile.restore();
    });
});
