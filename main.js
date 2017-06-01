window.onload = function () {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        spherePoints = [
            vector.create(width / 2 - 200, height / 2),
            vector.create(width / 2, height - 200),
            vector.create(width / 2 + 300, height / 2)
        ],

        SPRING_CONSTANT = 0.08,
        PUSH_FORCE = 15,
        SPHERE_RADIUS = 17,
        SPHERE_FRICTION = 0.85,

        spheres = [
            getSphere(spherePoints[0]), getSphere(spherePoints[1]), getSphere(spherePoints[2])
        ];

    var mouseIsDown = false;
    var mouseX;
    var mouseY;

    document.body.addEventListener("mousemove", function (event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    canvas.onmousedown = function () {
        mouseIsDown = true;
    };
    canvas.onmouseup = function () {
        mouseIsDown = false;
    };

    update();

    function getSphere(startPoint) {
        var sphere = particle.create(
            startPoint.getX(),
            startPoint.getY(),
            0,
            Math.random(),
            0);
        sphere.radius = SPHERE_RADIUS;
        sphere.friction = SPHERE_FRICTION;
        return sphere;
    }

    function updateSphere(sphere, point) {
        var distance = point.subtract(sphere.position);
        distance.setLength(distance.getLength());
        var springForce = distance.multiply(SPRING_CONSTANT);

        sphere.velocity.addTo(springForce);

        if (mouseIsDown) {
            var force = vector.create(sphere.position.getX() - mouseX, sphere.position.getY() - mouseY);
            var unitForce = force.divide(force.getLength());
            var touchDistance = sphere.distanceTo(particle.create(mouseX, mouseY, 0, Math.random(), 0)) / 100;
            var realForce = unitForce.multiply(PUSH_FORCE / (touchDistance*touchDistance));
            sphere.velocity.addTo(realForce);
        }

        sphere.update();

        context.beginPath();
        context.arc(
            sphere.position.getX(),
            sphere.position.getY(),
            sphere.radius,
            0,
            Math.PI * 2,
            false
        );
        context.fill();

        context.beginPath();
        context.arc(
            point.getX(),
            point.getY(),
            3,
            0,
            Math.PI * 2,
            false
        );
        context.fill();
    }

    function update() {
        context.clearRect(0, 0, width, height);
        for (var i = 0; i < spheres.length; i++) {
            updateSphere(spheres[i], spherePoints[i]);
        }
        requestAnimationFrame(update);
    }
};

