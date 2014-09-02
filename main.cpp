#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QFont>


int main(int argc, char *argv[])
{
    QGuiApplication app(argc, argv);

    QQmlApplicationEngine engine;
    engine.load(QUrl(QStringLiteral("qrc:///main.qml")));
    app.setFont(QFont ("Ubuntu", 9));

    return app.exec();
}
