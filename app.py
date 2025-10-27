from flask import Flask, render_template, url_for, send_from_directory, redirect, request, flash, session
from flask_mysqldb import MySQL
from werkzeug.security import generate_password_hash, check_password_hash
import requests
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)

app.secret_key = 'clave_secreta'
app.config['MYSQL_HOST'] = 'florerialogin.c56wy8mq0stq.us-east-1.rds.amazonaws.com'
app.config['MYSQL_PORT'] = 3306
app.config['MYSQL_USER'] = 'admin'
app.config['MYSQL_PASSWORD'] = 'floreriamanu'
app.config['MYSQL_DB'] = 'floreria_db'

mysql = MySQL(app)


# Ruta para el sitemap
@app.route('/sitemap.xml')
def sitemap():
    return send_from_directory(directory='.', path='sitemap.xml', mimetype='application/xml')


# Página principal
@app.route('/', methods=['GET', 'POST'])
def home():
    audio = {
        "audioRamo1": url_for('static', filename='audio/ramos/alma de bosque.wav'),
        "audioRamo2": url_for('static', filename='audio/ramos/aurora moderna.wav'),
        "audioRamo3": url_for('static', filename='audio/ramos/atetish.wav'),
        "audioRamo4": url_for('static', filename='audio/ramos/belicate.wav'),
        "audioRamo5": url_for('static', filename='audio/ramos/canto de rio.wav'),
        "audioRamo6": url_for('static', filename='audio/ramos/clicken lila.wav'),
        "audioRamo7": url_for('static', filename='audio/ramos/corazón de jardin.wav'),
        "audioRamo8": url_for('static', filename='audio/ramos/deliccat.wav'),
        "audioRamo9": url_for('static', filename='audio/ramos/dulce amanecer.wav'),
        "audioRamo10": url_for('static', filename='audio/ramos/eco de primavera.wav'),
        "audioRamo11": url_for('static', filename='audio/ramos/elegancia pura.wav'),
        "audioRamo12": url_for('static', filename='audio/ramos/elixir de flores.wav'),
        "audioRamo13": url_for('static', filename='audio/ramos/eterno romance.wav'),
        "audioArreglo1": url_for('static', filename='audio/arreglos/anivesh.wav'),
    }

    # Llamamos cada imagen por separado
    imagenes = {
        "whatsapp": url_for('static', filename='image/logos/whatsapp.png'),
        "imagen1": url_for('static', filename='image/ramos/ramo1.jpg'),
        "Facebook": url_for('static', filename='image/logos/facebook.png'),
        "imagen2": url_for('static', filename='image/ramos/ramo2.jpg'),
        "imagen3": url_for('static', filename='image/ramos/ramo3.png'),
        "imagen4": url_for('static', filename='image/ramos/ramo4.png'),
        "imagen5": url_for('static', filename='image/ramos/ramo5.jpg'),
        "imagen6": url_for('static', filename='image/ramos/ramo6.png'),
        "imagen7": url_for('static', filename='image/ramos/ramo7.jpg'),
        "imagen8": url_for('static', filename='image/ramos/ramo8.jpg'),
        "imagen9": url_for('static', filename='image/ramos/ramo9.jpg'),
        "imagen10": url_for('static', filename='image/ramos/ramo10.png'),
        "imagen11": url_for('static', filename='image/ramos/ramo11.jpg'),
        "imagen12": url_for('static', filename='image/ramos/ramo12.jpg'),
        "imagen13": url_for('static', filename='image/ramos/ramo13.png'),
        #Arreglos:
        "imagen14":url_for('static', filename='image/Arreglos/arreglo1.jpg'),
        "imagen15":url_for('static', filename='image/Arreglos/arreglo2.jpg'),
        "imagen16":url_for('static', filename='image/Arreglos/arreglo3.jpg'),
        "imagen17":url_for('static', filename='image/Arreglos/arreglo4.webp'),
        "imagen18":url_for('static', filename='image/Arreglos/arreglo5.jpg'),
        "imagen19":url_for('static', filename='image/Arreglos/arreglo6.jpg'),
        "imagen20":url_for('static', filename='image/Arreglos/arreglo7.jpg'),
        "imagen21":url_for('static', filename='image/Arreglos/arreglo8.jpg'),
        "imagen22":url_for('static', filename='image/Arreglos/arreglo9.jpg'),
        "imagen23":url_for('static', filename='image/Arreglos/arreglo10.jpg'),
        "imagen24":url_for('static', filename='image/Arreglos/arreglo11.jpg'),
        "imagen25":url_for('static', filename='image/Arreglos/arreglo12.jpg'),
        "imagen26":url_for('static', filename='image/Arreglos/arreglo13.jpg'),
        "imagen27":url_for('static', filename='image/Arreglos/arreglo14.jpg'),
        "imagen28":url_for('static', filename='image/Arreglos/arreglo15.jpg'),
        "imagen29":url_for('static', filename='image/Arreglos/arreglo16.jpg'),
        "imagen30":url_for('static', filename='image/Arreglos/arreglo17.jpg'),
        "imagen31":url_for('static', filename='image/Arreglos/arreglo18.jpg'),
        "imagen32":url_for('static', filename='image/Arreglos/arreglo19.jpg'),
        "carrito": url_for('static', filename='image/logos/carrito.png'),
        "carrito2": url_for('static', filename='image/logos/carrito2.png'),
        "favorito": url_for('static', filename='image/logos/favorito.png'),
        "favorito2": url_for('static', filename='image/logos/favorito2.png'),
        "retos": url_for('static', filename='image/logos/retos.gif'),
        "claro_oscuro": url_for('static', filename='image/logos/claro.png'),
        "oscuro_claro": url_for('static', filename='image/logos/oscuro.png'),
        "favorito_rojo": url_for('static', filename='image/logos/favorito-rojo.png'),
        "perfil": url_for('static', filename='image/logos/perfil.png'),
        "perfil2": url_for('static', filename='image/logos/perfil2.png'),
        "google": url_for('static', filename='image/logos/google.jpg'),
        "facebook": url_for('static', filename='image/logos/facebook.jpg'),
        "linkedin": url_for('static', filename='image/logos/linkedin.jpg'),
        "descuento1": url_for('static', filename='image/descuentos/descuento1.png'),
        "descuento2": url_for('static', filename='image/descuentos/descuento2.png'),
        "descuento3": url_for('static', filename='image/descuentos/descuento3.png'),
        "descuento4": url_for('static', filename='image/descuentos/descuento4.png'),
        "descuento5": url_for('static', filename='image/descuentos/descuento5.png'),
        "descuento6": url_for('static', filename='image/descuentos/descuento6.png'),
        "descuento7": url_for('static', filename='image/descuentos/descuento7.png'),
        "buscador": url_for('static', filename='image/logos/buscador.png'),
        "chatbot": url_for('static', filename='image/logos/chatbot-icon.png'),
    }

    # Si llega un POST a "/", lo puedes manejar aquí
    if request.method == 'POST':
        return redirect('/')

    return render_template('index.html', **imagenes, **audio)


@app.route('/envio', methods=['GET', 'POST'])
def envio():
    return render_template('envio.html')

@app.route('/normal', methods=['GET', 'POST'])
def normal():
    return render_template('normal.html')



# Página de registro con soporte para POST
@app.route('/registro', methods=['GET', 'POST'])
def registro():
    if request.method == 'POST':
        nombre = request.form['nombre']
        email = request.form['email']
        telefono = request.form['telefono']
        contraseña = request.form['contraseña']
        confirmar_contraseña = request.form['confirmar_contraseña']
        preferencias = request.form.get('preferencias')

        if contraseña != confirmar_contraseña:
            flash('⚠️ Las contraseñas no coinciden.', 'error')
            return redirect('/registro')

        cur = mysql.connection.cursor()
        try:
            cur.execute("""
                INSERT INTO usuarios (nombre, email, telefono, contraseña, preferencias)
                VALUES (%s, %s, %s, %s, %s)
            """, (nombre, email, telefono, contraseña, preferencias))
            mysql.connection.commit()
            flash('✅ Usuario registrado correctamente.', 'success')
        except Exception as e:
            mysql.connection.rollback()
            flash(f'⚠️ Error al registrar usuario: {e}', 'error')
        finally:
            cur.close()

        return redirect('/login')

    return render_template('registro.html')


# Retornar para el formulario de inicio
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        nombre = request.form['nombre']
        contraseña = request.form['contraseña']

        cur = mysql.connection.cursor()
        cur.execute("SELECT id, nombre, contraseña FROM usuarios WHERE nombre = %s", (nombre,))
        usuario = cur.fetchone()
        cur.close()

        if usuario and usuario[2] == contraseña:
            session['user_id'] = usuario[0]
            session['nombre'] = usuario[1]
            flash('✅ Inicio de sesión exitoso.', 'success')
            return redirect('/mi_cuenta')
        else:
            flash('⚠️ Nombre o contraseña incorrectos.', 'error')

    return render_template('login.html')



@app.route("/chatbot")
def index():
    return render_template("chatbot.html")

@app.route("/juego", endpoint="juego")
def index():
    return render_template("juego.html")

#dedicatorias
@app.route("/dedicatorias")
def dedicatorias():
    return render_template("dedicatorias.html")

#formulario dedicatorias
@app.route('/formulario_dedicatorias')
def formulario_dedicatorias():
    return render_template('formulario_dedicatorias.html')

#Fidelizacion
@app.route("/fidelizacion")
def fidelizacion():
    return render_template("fidelizacion.html")
#Carrito
@app.route("/carrito")
def carrito():
    return render_template("carrito.html")
#favorito
@app.route("/favoritos")
def favorito():
    return render_template("favoritos.html")

#formulario de compra
@app.route('/formulario_compra', methods=['GET', 'POST'])
def formulario_compra():
    if request.method == 'POST':
        nombre = request.form['nombre']
        apellido = request.form['apellido']
        correo = request.form['correo']
        telefono = request.form['telefono']
        direccion = request.form['direccion']
        referencia = request.form.get('referencia', '')
        pago = request.form['pago']
        entrega = request.form['entrega']
        fecha_entrega = request.form['fecha_entrega']
        hora_entrega = request.form['hora_entrega']

        producto_nombre = request.form.get('producto_nombre', None)
        producto_precio = request.form.get('producto_precio', None)
        from datetime import datetime
        try:
            fecha_actual = datetime.now().date()
            fecha_form = datetime.strptime(fecha_entrega, "%Y-%m-%d").date()
            if fecha_form <= fecha_actual:
                flash('⚠️ La fecha de entrega debe ser futura.', 'error')
                return redirect('/formulario_compra')
        except ValueError:
            flash('⚠️ Fecha de entrega inválida.', 'error')
            return redirect('/formulario_compra')


        cur = mysql.connection.cursor()
        try:
            cur.execute("""
                INSERT INTO compras 
                (nombre, apellido, correo, telefono, direccion, referencia, pago, entrega, fecha_entrega, hora_entrega, producto_nombre, producto_precio)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (nombre, apellido, correo, telefono, direccion, referencia, pago, entrega, fecha_entrega, hora_entrega, producto_nombre, producto_precio))
            mysql.connection.commit()
            flash('✅ Pedido enviado correctamente.', 'success')
        except Exception as e:
            mysql.connection.rollback()
            flash(f'⚠️ Error al guardar el pedido: {e}', 'error')
        finally:
            cur.close()

        return redirect('/formulario_compra')

    return render_template('formulario_compra.html')

#formulario cotizacion 
@app.route("/formulario_cotizacion")
def formulario_cotizacion():
    return render_template("formulario_cotizacion.html")

@app.route("/selector_retos")
def retos():
    return render_template("retos.html")

@app.route("/nosotros")
def nosotros():
    return render_template("nosotros.html")

@app.route("/politica_privacidad")
def politica_privacidad():
   return render_template("politica_privacidad.html")

@app.route("/terminos_condiciones")
def terminos_condiciones():
   return render_template("terminos_condiciones.html")


@app.route("/Sitio_Inclusivo")
def sitio_inclusivo():
    return render_template("sitioConVozDeGuia.html")

@app.route("/Alma_de_Bosque")
def alma_de_bosque():
    return render_template("infoRamos/almadebosque.html")

@app.route("/Aurora_Moderna")
def aurora_moderna():
    return render_template("infoRamos/Auroramoderna.html")

@app.route("/Atetish")
def atetish():
    return render_template("infoRamos/Atetish.html")

@app.route("/Belicate")
def belicate():
    return render_template("infoRamos/Belicate.html")

@app.route("/Canto_de_Rio")
def canto_de_rio():
    return render_template("infoRamos/CantodeRio.html")

@app.route("/Clicken_Lila")
def clicken_lila():
    return render_template("infoRamos/ClickenLila.html")

@app.route("/CorazondeJardin")
def corazon_de_jardin():
    return render_template("infoRamos/Corazon_de_jardin.html")

@app.route("/Deliccat")
def deliccat():
    return render_template("infoRamos/Deliccat.html")

@app.route("/LibroReclamos")
def libroReclamos():
    return render_template("libro.html")

@app.route("/mi_cuenta", methods=['GET', 'POST'])
def mi_cuenta():
    if 'user_id' not in session:
        flash('⚠️ Debes iniciar sesión primero.', 'error')
        return redirect('/login')

    cur = mysql.connection.cursor()

    if request.method == 'POST':
        nombre = request.form.get('nombre')
        apellido = request.form.get('apellido')
        telefono = request.form.get('telefono')
        direccion = request.form.get('direccion')

        try:
            cur.execute("""
                UPDATE usuarios 
                SET nombre=%s, apellido=%s, telefono=%s, direccion=%s
                WHERE id=%s
            """, (nombre, apellido, telefono, direccion, session['user_id']))
            mysql.connection.commit()
            flash('✅ Perfil actualizado correctamente.', 'success')
        except Exception as e:
            mysql.connection.rollback()
            flash(f'⚠️ Error al actualizar perfil: {e}', 'error')

    cur.execute("""
        SELECT nombre, apellido, email, telefono, direccion
        FROM usuarios
        WHERE id=%s
    """, (session['user_id'],))
    usuario = cur.fetchone()
    cur.close()

    user = {
        'nombre': usuario[0],
        'apellido': usuario[1],
        'email': usuario[2],
        'telefono': usuario[3],
        'direccion': usuario[4],
    }

    return render_template("mi_cuenta.html", user=user)




if __name__ == '__main__':
    app.run(debug=True)